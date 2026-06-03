import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main title shown in the hero section (e.g., "Welcome to")',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
      description: 'Short tagline displayed below the hero title',
    }),
    defineField({
      name: 'welcomeMessage',
      title: 'Welcome Message',
      type: 'text',
      description: 'Short description shown on the hero section',
    }),
    defineField({
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      description: 'Call-to-action buttons in the hero section (max 2 recommended)',
      of: [
        defineField({
          type: 'object',
          name: 'ctaButton',
          fields: [
            defineField({
              name: 'label',
              title: 'Button Label',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
              description: 'e.g., /about or /contact',
            }),
            defineField({
              name: 'style',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  {title: 'Primary (Dark)', value: 'primary'},
                  {title: 'Secondary (Glass)', value: 'secondary'},
                ],
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'stats',
      title: 'School Statistics',
      type: 'object',
      description: 'Numbers shown in the stats counter section',
      fields: [
        defineField({
          name: 'students',
          title: 'Total Students',
          type: 'number',
          description: 'e.g., 2500',
        }),
        defineField({
          name: 'teachers',
          title: 'Expert Faculty Count',
          type: 'number',
          description: 'e.g., 120',
        }),
        defineField({
          name: 'yearsEstablished',
          title: 'Years of Excellence',
          type: 'number',
          description: 'e.g., 25',
        }),
        defineField({
          name: 'awards',
          title: 'Awards & Recognitions',
          type: 'number',
          description: 'e.g., 50',
        }),
      ],
    }),
  ],
})
