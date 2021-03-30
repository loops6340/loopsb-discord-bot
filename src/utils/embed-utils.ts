export function code(content:string, lang?:string) {
    if(!lang) return  `\`\`\`${content}\`\`\``
    else return `\`\`\`${lang}
    ${content}
    \`\`\``
}
