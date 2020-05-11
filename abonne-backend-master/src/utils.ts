export const ExtractUpdatesForSQL = (updates: {}) => {
  const keys = Object.keys(updates);
  const values = Object.values(updates);
  const result: string[] = [];
  for (let i = 0; i < keys.length; i++) {
    result.push(`${keys[i]}`);
    i < keys.length - 1 ? result.push(`'${values[i]}',`) : result.push(`'${values[i]}'`);
  }
  return result;
};

export const ExtractUpdatesForSQLv2 = (updates: object) => {
  const entries = Object.entries(updates);
  const result: string[] = [];
  for (const entry of entries) {
    if (entry[1] !== undefined) {
      result.push(`${entry[0]} = '${entry[1]}'`);
    }
  }
  const updateString = result.join(", ");
  return updateString;
};

export const ExtractFilesForSQL = (files: object) => {
  const entries = Object.entries(files);
  const result = entries.filter(entry => entry[1]);
  return result;
};
