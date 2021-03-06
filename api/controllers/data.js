exports.getAirtableRecords = (table, options) => {
  let records = [];
  let params = {
    view: 'Grid view',
    pageSize: 100, // default
  };

  Object.assign(params, options);

  return new Promise((resolve, reject) => {
    if (records.length > 0) resolve(records);

    const processPage = (partialRecords, fetchNextPage) => {
      records = [...records, ...partialRecords];
      fetchNextPage();
    };

    const processRecords = (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(records);
    };

    table.select(params).eachPage(processPage, processRecords);
  });
};

exports.updateRecord = (table, recordId, fieldsToUpdate) => {
  return table.update(recordId, fieldsToUpdate);
};
