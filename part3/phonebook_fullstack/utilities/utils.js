const generateId = (persons) => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map((n) => Number(n.id)))
    : 0;
  return String(maxId + 1);
};

// eslint-disable-next-line no-undef
module.exports = generateId;
