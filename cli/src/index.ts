#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { mkdirSync, existsSync, cpSync, writeFileSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { unzipSync } from 'fflate';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const GITHUB_REPO = 'burkido/lumo-ui-skills';
const SKILL_DIR_NAME = 'lumo-ui';
const SKILL_BASE = 'skills/lumo-ui/';

type Agent = 'claude' | 'cursor' | 'windsurf' | 'all';
type SingleAgent = Exclude<Agent, 'all'>;

const AGENT_SKILL_DIRS: Record<SingleAgent, string> = {
  claude: '.claude/skills',
  cursor: '.cursor/skills',
  windsurf: '.windsurf/skills',
};

async function downloadZip(spinner: ReturnType<typeof ora>): Promise<Uint8Array> {
  const url = `https://github.com/${GITHUB_REPO}/archive/refs/heads/main.zip`;
  spinner.text = 'Downloading lumo-ui skill from GitHub...';

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download skill: ${response.statusText}`);
  }

  const buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
}

function extractSkillFiles(zipData: Uint8Array, targetDir: string) {
  const files = unzipSync(zipData);

  for (const [filePath, data] of Object.entries(files)) {
    // Strip the top-level archive folder (e.g. lumo-ui-skills-main/)
    const relativePath = filePath.replace(/^[^/]+\//, '');
    if (!relativePath.startsWith(SKILL_BASE)) continue;

    // Strip skills/lumo-ui/ prefix to get the path relative to the skill root
    const skillRelPath = relativePath.slice(SKILL_BASE.length);
    if (!skillRelPath) continue;

    const destPath = join(targetDir, skillRelPath);

    if (filePath.endsWith('/')) {
      mkdirSync(destPath, { recursive: true });
    } else {
      mkdirSync(dirname(destPath), { recursive: true });
      writeFileSync(destPath, data);
    }
  }
}

async function installSkill(options: { agent: Agent; dir: string; force: boolean }) {
  const targetRoot = resolve(options.dir);
  const agents: SingleAgent[] = options.agent === 'all'
    ? ['claude', 'cursor', 'windsurf']
    : [options.agent as SingleAgent];

  const targets = agents.map(a => ({
    agent: a,
    skillBaseDir: join(targetRoot, AGENT_SKILL_DIRS[a]),
    skillTargetDir: join(targetRoot, AGENT_SKILL_DIRS[a], SKILL_DIR_NAME),
  }));

  const alreadyInstalled = targets.filter(t => existsSync(t.skillTargetDir) && !options.force);
  if (alreadyInstalled.length > 0) {
    for (const t of alreadyInstalled) {
      console.log(chalk.yellow(`\n⚠ Skill already installed at ${t.skillTargetDir}`));
    }
    console.log(chalk.dim('  Use --force to overwrite.\n'));
    if (alreadyInstalled.length === targets.length) return;
  }

  const toInstall = targets.filter(t => !existsSync(t.skillTargetDir) || options.force);

  const spinner = ora('Installing lumo-ui skill...').start();

  try {
    for (const t of toInstall) {
      mkdirSync(t.skillBaseDir, { recursive: true });
    }

    const bundledSkillDir = join(__dirname, '../../skills/lumo-ui');

    if (existsSync(bundledSkillDir)) {
      spinner.text = 'Copying skill files...';
      for (const t of toInstall) {
        cpSync(bundledSkillDir, t.skillTargetDir, { recursive: true });
      }
    } else {
      spinner.text = 'Fetching skill from GitHub...';
      const zipData = await downloadZip(spinner);

      spinner.text = 'Extracting skill files...';
      for (const t of toInstall) {
        mkdirSync(t.skillTargetDir, { recursive: true });
        extractSkillFiles(zipData, t.skillTargetDir);
      }
    }

    spinner.succeed(chalk.green('lumo-ui skill installed'));
    for (const t of toInstall) {
      console.log(chalk.dim(`  → ${t.skillTargetDir}`));
    }
    printNextSteps(options.agent);
  } catch (err) {
    spinner.fail(chalk.red('Installation failed'));
    throw err;
  }
}

function printNextSteps(agent: Agent) {
  console.log('');
  console.log(chalk.bold('Next steps:'));
  if (agent === 'claude' || agent === 'all') {
    console.log(chalk.dim('  The lumo-ui skill is now active in Claude Code.'));
    console.log(chalk.dim('  Ask Claude about any lumo-ui component or setup.'));
  }
  console.log('');
  console.log(chalk.dim('  Docs: https://www.lumoui.com'));
  console.log(chalk.dim('  GitHub: https://github.com/nomanr/lumo-ui'));
  console.log('');
}

program
  .name('lumo-ui-skill')
  .description('Install the lumo-ui skill for AI coding assistants')
  .version('1.0.0');

program
  .command('install')
  .alias('add')
  .description('Install the lumo-ui skill into your project')
  .option('-a, --agent <agent>', 'Target agent (claude, cursor, windsurf, all)', 'claude')
  .option('-d, --dir <path>', 'Target project directory', '.')
  .option('-f, --force', 'Overwrite existing installation', false)
  .action(async (opts) => {
    const validAgents: Agent[] = ['claude', 'cursor', 'windsurf', 'all'];
    if (!validAgents.includes(opts.agent as Agent)) {
      console.error(chalk.red(`Invalid agent "${opts.agent}". Valid options: ${validAgents.join(', ')}`));
      process.exit(1);
    }

    console.log('');
    console.log(chalk.bold('lumo-ui skill installer'));
    console.log(chalk.dim('Jetpack Compose UI components for Android & KMP'));
    console.log('');

    await installSkill({ agent: opts.agent as Agent, dir: opts.dir, force: opts.force });
  });

program
  .command('uninstall')
  .alias('remove')
  .description('Remove the lumo-ui skill from your project')
  .option('-a, --agent <agent>', 'Target agent (claude, cursor, windsurf, all)', 'claude')
  .option('-d, --dir <path>', 'Target project directory', '.')
  .action(async (opts) => {
    const targetRoot = resolve(opts.dir);
    const agent = opts.agent as Agent;
    const agents: SingleAgent[] = agent === 'all'
      ? ['claude', 'cursor', 'windsurf']
      : [agent as SingleAgent];

    let removed = 0;
    for (const a of agents) {
      const skillDir = join(targetRoot, AGENT_SKILL_DIRS[a], SKILL_DIR_NAME);
      if (!existsSync(skillDir)) continue;

      const { rmSync } = await import('fs');
      rmSync(skillDir, { recursive: true, force: true });
      console.log(chalk.green(`\n✓ lumo-ui skill removed from ${skillDir}`));
      removed++;
    }

    if (removed === 0) {
      console.log(chalk.yellow(`\n⚠ No lumo-ui skill found for agent "${agent}"\n`));
    } else {
      console.log('');
    }
  });

// Default action: run install when called with no subcommand (npx lumo-ui-skill)
if (process.argv.length === 2) {
  process.argv.push('install');
}

program.parse();
