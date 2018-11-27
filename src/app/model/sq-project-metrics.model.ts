export class SqProjectMetrics {
  static METRIC_LIST: string[] = [
    'files',
    'directories',
    'functions',
    'classes',
    'ncloc',
    'comment_lines',
    'code_smells',
    'duplicated_lines',
    'complexity'
  ];

  // TODO: Remove METRIC_LIST and use METRIC_MAP entries keys as query params
  static METRIC_MAP = {
    files: 'filesCount',
    directories: 'directoriesCount',
    functions: 'functionsCount',
    classes: 'classesCount',
    ncloc: 'nonCommentedLines',
    comment_lines: 'commentedLines',
    code_smells: 'codeSmells',
    duplicated_lines: 'duplicatedLines',
    complexity: 'cyclomaticComplexity'
  };

  lastAnalysisDate?: string;

  filesCount: string;
  directoriesCount: string;
  functionsCount: string;
  classesCount: string;

  // Non-commented lines of code
  nonCommentedLines: string;

  // Commented lines of code
  commentedLines: string;

  codeSmells: string;

  // ? Percentage or overall
  duplicatedLines: string;
  cyclomaticComplexity: string;
}
