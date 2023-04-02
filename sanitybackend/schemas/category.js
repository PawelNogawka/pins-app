export default {
    name: 'category',
    title: 'category',
    type: 'document',
    fields: [
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
          name: 'desc',
          title: 'Desc',
          type: 'string',
        },
        {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
            source:'name',
            maxLength:90,
            validation: (Rule) => Rule.required(),
          },
        }
    ],
  }