export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
      {
        name: 'value',
        title: 'Value',
        type: 'string',
      },
      {
        name: 'postedBy',
        title: 'Posted By',
        type: 'reference',
        to: [{type: 'user'}],
      },
      {
        name: 'pin',
        title: 'Pin',
        type: 'reference',
        to: [{type: 'pin'}],
      },
    ],
  }
  