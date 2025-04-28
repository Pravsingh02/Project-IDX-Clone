const extensionToTypeMap = {
     'js': 'javascript',
     'ts': 'typescript',
     'jsx': 'javascript',
     'tsx': 'typescript',
     'html': 'html',
     'css': 'css',
     'json': 'json',
     'xml': 'xml',
     'yaml': 'YAML',
     'md': 'markdown',
     'svg': 'svg',
}
export const extensionToFileType = (extension) => {
     if(!extension) return null;
     return extensionToTypeMap[extension] || 'text/plain';
}