exports.handler = async (event, context) => {
  const guides = [
    { title: 'Test1', author: 'test1' },
    { title: 'Test2', author: 'test2' },
    { title: 'Test3', author: 'test3' },
  ];

  if (context.clientContext.user) {
    return {
      statusCode: 200,
      body: JSON.stringify(guides),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ message: 'You must be logged in!' }),
  };
};
