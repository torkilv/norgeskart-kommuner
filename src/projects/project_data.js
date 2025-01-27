const projects = [
    {
        title: "UK Travel Visualiser",
        date: "PRESENT",
        description: "UK county map with colourable regions to visualise user's travel",
        detail: `Allows the user to click counties and select whether they have lived, stayed, visited, stopped, passed, or never been there. The county is filled with the corresponding colour on selection and their UK 'level' updated.

Concept inspired by https://lab.magiconch.com/china-ex/ and https://tenpages.github.io/us-level/eu.html.`,
        pageUrl: "smstone0.github.io/#/uk-map",
        codeUrl: "https://github.com/smstone0/smstone0.github.io",
        thumbnail: "assets/MapChart_Map.svg",
        languages: ["React", "JavaScript", "HTML", "CSS"],
    },
    {
        title: "Caloric",
        date: "JUN 2023 - PRESENT",
        description: `Cross-platform calorie counting app designed for minimalism and simplicity`,
        detail: `Began as a personal project over the summer of 2023 to teach myself mobile development and interface design. Provides a beginner-friendly method to track nutrition compared with other apps by focusing on the essentials, eliminating details such as macros and meal times. Currently in progress with plans to complete by the end of 2025.`,
        designUrl: "https://www.figma.com/design/ojnG7Z2LYuzCuDM0TMUUiA/Caloric?node-id=0-1&node-type=canvas&t=lJdGKqTurMDbI7DR-0",
        codeUrl: "https://github.com/smstone0/Caloric",
        thumbnail: "assets/caloric/caloric.png",
        languages: ["Flutter", "SQL (SQLite)", "Figma"]
    },
    {
        title: "Software Engineering Group Project",
        date: "SEP 2023 - JUN 2024",
        description: `University group project to develop an event-finding app for industry partner, Lots For Tots`,
        detail: "Team Leader of 8 computer science students. Developed app free of charge, allowing parents to find nearby children's events. Integrated accessibility, offering visual comfort options and filtering of events by SEN and wheelchair access. Created interactive prototypes, and iteratively gathered requirements and user feedback to guide app design. Utilised Scrumban, and paired programming and code reviews to ensure code quality. Showcased work to academics, industry leaders and peers.",
        designUrl: "https://www.figma.com/design/pBlTcItDic1lt4CA2VA81k/Prototyping?t=Jc90sSWYw35fi01r-0",
        thumbnail: "assets/lots-for-tots/lots-for-tots.png",
        languages: ["Flutter", "Figma"]
    },
    {
        title: "Operating Systems and Concurrency",
        date: "OCT 2023 - JAN 2024",
        description: `University project to implement a process and I/O management simulation via the POSIX API in Linux`,
        detail: "",
        thumbnail: "assets/nottingham.svg",
        languages: ["C"]
    },
]

export default projects;