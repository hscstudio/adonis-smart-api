'use strict'

class DevController {
  abc () {
    return 'DevController > abc'
  }

  async xyz ({ request }) {
    const rules = {
      email: 'required|email',
      password: 'required',
    };

    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return 'Validation failed ~ ' + JSON.stringify(validation.messages())
    }
    return 'Validation passed'
  }
}

module.exports = DevController
