import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'schoolName',
      title: 'School Name',
      type: 'string',
    }),
    defineField({
      name: 'schoolLogo',
      title: 'School Logo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
    }),
    defineField({
      name: 'vision',
      title: 'Vision Statement',
      type: 'text',
    }),
    defineField({
      name: 'schoolHistory',
      title: 'School History',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'principalMessage',
      title: "Principal's Message",
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'principalName',
      title: "Principal's Name",
      type: 'string',
    }),
    defineField({
      name: 'principalImage',
      title: "Principal's Image",
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'highlights',
      title: 'School Highlights',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Highlight Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'React icon name (e.g., FaBook, FaDesktop)',
            }),
          ],
        }),
      ],
    }),
  ],
})
