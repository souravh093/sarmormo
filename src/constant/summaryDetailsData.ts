// components/summaries/summary.ts
// This is a mock implementation that directly returns the summary data you provided

export interface Summary {
    id: string;
    user_id: string;
    original_file_url: string;
    summary_text: string;
    status: string;
    title: string;
    file_name: string;
    created_at: Date;
    updated_at: Date;
  }
  
  export async function getSummary(){
    // This is the mock data provided in the prompt
    return {
      id: '96cca83b-8364-4cba-895a-6e0e7e18361a',
      user_id: 'user_2uLlbUnEoX48SbQwt0x6xlQx4OK',
      original_file_url: 'https://utfs.io/f/Nu78rLOfICloPA6iDMc6Cv4NQXfVGI8aoZcB3MneiyEYdDt2',
      summary_text: '# Sourave Halder: Full Stack Developer Ready to Innovate! 👨‍💻\n' +
        '🎯 A motivated web development graduate eager to contribute skills and enthusiasm to innovative projects.\n' +
        '. 📌 Committed to industry standards and exceptional user experiences.\n' +
        '\n' +
        '# 📜 Document Details\n' +
        '. 📄 Type: Resume/CV\n' +
        '. 🧑‍🤝‍🧑 For: Potential Employers\n' +
        '\n' +
        '# 📚 Key Highlights\n' +
        '. 🚀 Expertise in React.js, Next.js, Redux, Prisma, MySQL, MongoDB, HTML, and CSS.\n' +
        '. 🌟 Comfortable with JavaScript, Express.js, TypeScript, Mongoose, and PostgreSQL.\n' +
        '. 🎉 8 months of hands-on experience in web application development and maintenance.\n' +
        '\n' +
        '# Why It Matters\n' +
        '. 💡 Sourave Halder is a skilled and enthusiastic Full Stack Developer ready to make a significant contribution. His experience, technical skills, and commitment to quality make him a valuable asset to any team looking to push the boundaries of web development and deliver exceptional user experiences.\n' +
        '\n' +
        '# Main Points\n' +
        '. 📌 Proven ability to independently manage web application development and maintenance.\n' +
        '. 📊 Strong skills in front-end and back-end technologies.\n' +
        '. 🔥 Successful implementation of real-time communication features and personalized dashboards.\n' +
        '\n' +
        '# Pro Tips\n' +
        '. ⭐ Highlight your project experience during interviews.\n' +
        '. 🚀 Showcase your problem-solving abilities with real-world examples.\n' +
        '. 🌟 Emphasize your commitment to continuous learning and adaptability.\n' +
        '\n' +
        '# Key Terms to Know\n' +
        '. 📚 MERN Stack: MongoDB, Express.js, React.js, Node.js - a popular JavaScript stack for building web applications.\n' +
        '. 📖 Redux: A predictable state container for JavaScript apps, commonly used with React for managing application state.\n' +
        '\n' +
        '# Bottom Line\n' +
        '. 🪄 Sourave Halder is a capable and driven Full Stack Developer poised to contribute to innovative web development projects.\n',
      status: 'completed',
      title: 'Sourave Resume',
      file_name: 'Sourave_Resume.pdf',
      created_at: '2025-03-17T16:31:26.494Z',
      updated_at: '2025-03-17T16:31:26.494Z'
    };
  }