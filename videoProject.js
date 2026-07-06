import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'videoProject',
  title: 'Video Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'The title of your video project (e.g., Elysian Clothing Summer Campaign)',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Determines which grid and filters this video will appear under',
      options: {
        list: [
          { title: 'Commercial & Promo', value: 'commercial' },
          { title: 'Narrative & Creative', value: 'narrative' },
          { title: 'Shorts & Reels (Vertical 9:16)', value: 'vertical' }
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      description: 'A brief summary detailing the editing style, sound design, narrative flow, or color grading details',
      rows: 4
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video Embed URL',
      type: 'url',
      description: 'Use the embeddable format. YouTube: https://www.youtube.com/embed/VIDEO_ID | Vimeo: https://player.vimeo.com/video/VIDEO_ID',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'thumbnail',
      title: 'Cover Image / Thumbnail',
      type: 'image',
      options: {
        hotspot: true // Allows you to crop and edit focal points inside Sanity Studio
      },
      description: 'Upload a cover thumbnail image (recommended size: 1280x720 for landscape, 720x1280 for vertical)',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'duration',
      title: 'Video Duration',
      type: 'string',
      description: 'e.g., 2:45 for horizontal videos or 0:30 for vertical reels',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'role',
      title: 'Your Role',
      type: 'string',
      description: 'e.g., Lead Editor, Colorist, VFX Artist',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'software',
      title: 'Software & Tools Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags' // Renders tags in Sanity Studio for clean entry
      },
      description: 'e.g., DaVinci Resolve, Adobe Premiere Pro, After Effects',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      description: 'The brand, company, or filmmaker you edited this for (use "Personal" if self-produced)'
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Spotlight?',
      type: 'boolean',
      description: 'Turn this ON to showcase this video in the large Spotlight banner at the top of the page',
      initialValue: false
    })
  ]
})
