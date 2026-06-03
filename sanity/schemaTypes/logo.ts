import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'logo',
  title: 'School Logo',
  type: 'document',
  description: 'Upload and manage the school logo. It appears in the navbar and about page.',
  fields: [
    defineField({
      name: 'schoolLogo',
      title: 'School Logo',
      type: 'image',
      options: {hotspot: true},
      description: 'Upload the school logo (PNG with transparent background recommended).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Logo Alt Text',
      type: 'string',
      description: 'Describe the logo for accessibility (e.g., "KIRAN PUBLIC SCHOOL Logo")',
      initialValue: 'KIRAN PUBLIC SCHOOL Logo',
    }),
    defineField({
      name: 'logoTagline',
      title: 'Tagline (optional)',
      type: 'string',
      description: 'Optional short tagline shown below the logo (e.g., "Excellence in Education")',
    }),
  ],
  preview: {
    select: {
      media: 'schoolLogo',
      title: 'altText',
    },
    prepare(selection: any) {
      return {
        title: selection.title || 'School Logo',
        media: selection.media,
        subtitle: 'Logo & Branding',
      }
    },
  },
})
