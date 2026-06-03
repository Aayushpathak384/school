import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'notice',
  title: 'Notice',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Notice Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Notice Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isImportant',
      title: 'Mark as Important',
      type: 'boolean',
      description: 'Important notices will be highlighted',
    }),
    defineField({
      name: 'pdfAttachment',
      title: 'PDF Attachment',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['General', 'Admission', 'Exam', 'Event', 'Holiday', 'Academic'],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      isImportant: 'isImportant',
    },
    prepare(selection: any) {
      return {
        title: selection.title,
        subtitle: `${new Date(selection.date).toLocaleDateString()}${selection.isImportant ? ' • Important' : ''}`,
      }
    },
  },
})
