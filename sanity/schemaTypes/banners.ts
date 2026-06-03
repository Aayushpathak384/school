import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'banners',
  title: 'Hero Banners',
  type: 'document',
  description: 'Upload and manage hero banner images shown on the homepage carousel.',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Label',
      type: 'string',
      description: 'For your reference only (not shown on website)',
      initialValue: 'Homepage Banners',
    }),
    defineField({
      name: 'images',
      title: 'Banner Images',
      type: 'array',
      description: 'Upload multiple images for the homepage banner carousel. Recommended size: 1920x1080px.',
      of: [
        defineField({
          type: 'object',
          name: 'bannerItem',
          title: 'Banner',
          fields: [
            defineField({
              name: 'image',
              title: 'Banner Image',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
              description: 'Optional text overlay caption for this banner',
            }),
            defineField({
              name: 'altText',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for accessibility and SEO',
            }),
          ],
          preview: {
            select: {
              media: 'image',
              title: 'caption',
            },
            prepare(selection: any) {
              return {
                title: selection.title || 'Banner Image',
                media: selection.media,
              }
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).error('At least one banner image is required'),
    }),
    defineField({
      name: 'autoplayInterval',
      title: 'Autoplay Interval (seconds)',
      type: 'number',
      description: 'How long each banner is shown before sliding to the next. Default: 5',
      initialValue: 5,
      validation: (rule) => rule.min(2).max(30),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection: any) {
      return {
        title: selection.title || 'Homepage Banners',
        subtitle: 'Hero Banner Carousel',
      }
    },
  },
})
