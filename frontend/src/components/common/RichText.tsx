interface RichTextProps {
  content: any[]
  className?: string
}

export default function RichText({ content, className = '' }: RichTextProps) {
  if (!content || content.length === 0) {
    return null
  }

  return (
    <div className={`prose dark:prose-invert max-w-none ${className}`}>
      {content.map((block, index) => {
        if (block._type === 'block') {
          const text = block.children?.map((child: any) => child.text).join('') || ''
          const style = block.style || 'normal'

          switch (style) {
            case 'h1':
              return (
                <h1 key={index} className="text-4xl font-bold mb-4">
                  {text}
                </h1>
              )
            case 'h2':
              return (
                <h2 key={index} className="text-3xl font-bold mb-3">
                  {text}
                </h2>
              )
            case 'h3':
              return (
                <h3 key={index} className="text-2xl font-bold mb-2">
                  {text}
                </h3>
              )
            case 'blockquote':
              return (
                <blockquote key={index} className="border-l-4 border-blue-600 pl-4 italic my-4">
                  {text}
                </blockquote>
              )
            default:
              return (
                <p key={index} className="mb-4 leading-relaxed">
                  {text}
                </p>
              )
          }
        }
        return null
      })}
    </div>
  )
}
