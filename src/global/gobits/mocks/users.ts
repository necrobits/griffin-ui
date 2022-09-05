export default  {
    'GET /users': [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'BCD' }
    ],
    'GET /users/1': {
        id: 1,
        name: 'ABC'
    },
    'POST /users': {
        id: 3,
        name: 'CDE'
    }
};