import React from 'react'

export default function About(props) {
  return (
    <div className='container' style={{color: props.mode==='light'?"#042743":"white"}}>
        <h1 className='my-3'>About Us</h1>
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{backgroundColor: props.mode==='light'?"white":"#032c4d", color: props.mode==='light'?"black":"white"}}>
                    <strong>Introduction</strong>
                </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div className="accordion-body" style={{backgroundColor: props.mode==='light'?"white":"#042743", color: props.mode==='light'?"black":"white"}}>
                Welcome to iNotebook, your ultimate digital notebook solution crafted with the cutting-edge MERN stack technology, comprising MongoDB, Express.js, React.js, and Node.js. In today’s fast-paced world, staying organized is more critical than ever, and iNotebook is here to help you streamline your note-taking process. Whether you are a student, professional, or just someone who loves jotting down thoughts, iNotebook provides a secure, efficient, and user-friendly platform for all your note-keeping needs.
                </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style={{backgroundColor: props.mode==='light'?"white":"#032c4d", color: props.mode==='light'?"black":"white"}}>
                    <strong>Why iNotebook</strong>
                </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body" style={{backgroundColor: props.mode==='light'?"white":"#042743", color: props.mode==='light'?"black":"white"}}>
                1. <strong>Secure Storage:</strong> Your notes are precious, and their security is our top priority. With iNotebook, all your data is stored in a robust MongoDB database. MongoDB’s flexibility and scalability ensure that your notes are not only safe but also easily accessible whenever you need them. Our backend, powered by Express.js and Node.js, ensures smooth and secure communication between the server and the database, providing you with a seamless experience.<br/>
                2. <strong>Intuitive Editing: </strong>Gone are the days of cumbersome and complicated note-editing tools. iNotebook leverages the power of React.js to offer a sleek and intuitive editing interface. You can effortlessly create new notes, edit existing ones, and format them to suit your preferences. The dynamic and responsive nature of React.js means you get real-time updates and changes, making your note-taking experience fluid and enjoyable.<br/>
                3. <strong>Effortless Management: </strong>Keeping your notes organized is just as important as creating them. iNotebook makes it incredibly easy to manage your notes. Whether you need to delete outdated notes or categorize your thoughts, our platform provides straightforward and efficient tools to keep your notebook clutter-free. The user-friendly dashboard lets you view all your notes at a glance, making it simple to find exactly what you need when you need it.<br/>
                4. <strong>Real-Time Updates: </strong>In a world where time is of the essence, waiting for updates is not an option. With iNotebook, you’ll experience real-time synchronization across all your devices. Thanks to the robust integration of Express.js and Node.js, any changes you make to your notes are instantly reflected, no matter where you access them from. This ensures that you always have the most up-to-date version of your notes, whether you are on your phone, tablet, or computer.<br/>
                </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" style={{backgroundColor: props.mode==='light'?"white":"#032c4d", color: props.mode==='light'?"black":"white"}}>
                    <strong>Join the iNotebook Community</strong>
                </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body" style={{backgroundColor: props.mode==='light'?"white":"#042743", color: props.mode==='light'?"black":"white"}}>
                Transform your note-taking experience with iNotebook. By combining the power of the MERN stack with a focus on user-centric design, iNotebook offers a reliable, efficient, and enjoyable platform for all your note-keeping needs. Join our community today and discover how easy and efficient note-taking can be. Whether you’re capturing ideas on the go or organizing your thoughts for a project, iNotebook is your trusted companion in staying organized and productive.
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}
