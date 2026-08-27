module.exports = {
  extends: ['@commitlint/config-conventional'],
  // Dependabot writes a multi-line body (release notes, compare links, the
  // updated-dependencies block) that we do not control and that always trips
  // body-max-line-length. Skip linting for its commits entirely.
  ignores: [(message) => message.includes('Signed-off-by: dependabot[bot]')],
  rules: {
    'type-enum': [2, 'always', [
      'fix', 'feat', 'docs', 'ci', 'chore', 'test', 'refactor', 'style', 'perf', 'build', 'revert',
      'Fix', 'Feat', 'Docs', 'Ci', 'Chore', 'Test', 'Refactor', 'Style', 'Perf', 'Build', 'Revert' 
      ]],
    'header-max-length': [2, 'always', 150],
    'subject-case': [0],
    'type-case': [0],
  }
};