const Mock = require('mockjs')

Mock.mock('/api/getForm', 'get', {
    "content": {
        "formId": 1
    },
    "result": "success",
    "errors": []
});