import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Information',
  type: 'document',
  fields: [
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Phone number for WhatsApp (with country code, e.g., 919876543210)',
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'WhatsApp Prefilled Message',
      type: 'string',
      description: 'Default message when user clicks "Chat with us" (optional)',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Street Address',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
    }),
    defineField({
      name: 'pincode',
      title: 'PIN Code',
      type: 'string',
    }),
    defineField({
      name: 'googleMapsEmbed',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'Get this from Google Maps: Share → Embed a map → copy src URL only',
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'officeHour',
          fields: [
            defineField({
              name: 'day',
              title: 'Day / Day Range',
              type: 'string',
              description: 'e.g., Monday - Friday',
            }),
            defineField({
              name: 'time',
              title: 'Timing',
              type: 'string',
              description: 'e.g., 9:00 AM - 5:00 PM',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube Channel URL',
          type: 'url',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter / X URL',
          type: 'url',
        }),
      ],
    }),
  ],
})
