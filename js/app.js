const $ = (id) => document.getElementById(id);

const defaultData = {
  education: [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institute: "Raj Kumar Goel Institute of Technology",
      date: "Sept 2023 – Present",
      details: "AKTU"
    }
  ],

  experience: [
    {
      role: "Technical Architecture Intern",
      company: "Autokryx Technologies Pvt Ltd",
      date: "Jun 2026 – Sept 2026",
      bullets:
        "Tested and evaluated AI-driven platform workflows|Documented functional issues and testing observations|Collaborated with the team during structured platform testing"
    }
  ],

  projects: [
    {
      name: "Resume Builder Pro",
      tech: "HTML, CSS, JavaScript",
      bullets:
        "Developed a responsive resume builder with dynamic resume sections and real-time preview|Implemented add, edit and remove functionality for education, experience, projects and achievements|Integrated client-side PDF generation for downloading professional A4 resumes"
    }
  ],

  achievements: [
    {
      title: "Java Full Stack Development",
      issuer: "SkillUp",
      date: "2026"
    }
  ]
};

let data = structuredClone(defaultData);
let currentResumeId = null;


/* =========================
   ESCAPE HTML
========================= */

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* =========================
   CREATE DYNAMIC ENTRY
========================= */

function makeEntry(type, item = {}) {

  if (type === "education") {
    return `
      <div class="dynamic-item">

        <input
          type="text"
          class="edu-degree"
          placeholder="Degree"
          value="${escapeHtml(item.degree)}"
        >

        <input
          type="text"
          class="edu-institute"
          placeholder="Institute"
          value="${escapeHtml(item.institute)}"
        >

        <input
          type="text"
          class="edu-date"
          placeholder="Date"
          value="${escapeHtml(item.date)}"
        >

        <input
          type="text"
          class="edu-details"
          placeholder="Details"
          value="${escapeHtml(item.details)}"
        >

        <button type="button" class="remove-btn">
          Remove
        </button>

      </div>
    `;
  }


  if (type === "experience") {
    return `
      <div class="dynamic-item">

        <input
          type="text"
          class="exp-role"
          placeholder="Job Role"
          value="${escapeHtml(item.role)}"
        >

        <input
          type="text"
          class="exp-company"
          placeholder="Company"
          value="${escapeHtml(item.company)}"
        >

        <input
          type="text"
          class="exp-date"
          placeholder="Date"
          value="${escapeHtml(item.date)}"
        >

        <textarea
          class="exp-bullets"
          placeholder="Write each bullet on a new line"
        >${escapeHtml((item.bullets || "").replace(/\|/g, "\n"))}</textarea>

        <button type="button" class="remove-btn">
          Remove
        </button>

      </div>
    `;
  }


  if (type === "project") {
    return `
      <div class="dynamic-item">

        <input
          type="text"
          class="project-name"
          placeholder="Project Name"
          value="${escapeHtml(item.name)}"
        >

        <input
          type="text"
          class="project-tech"
          placeholder="Technologies"
          value="${escapeHtml(item.tech)}"
        >

        <textarea
          class="project-bullets"
          placeholder="Write each bullet on a new line"
        >${escapeHtml((item.bullets || "").replace(/\|/g, "\n"))}</textarea>

        <button type="button" class="remove-btn">
          Remove
        </button>

      </div>
    `;
  }


  if (type === "achievement") {
    return `
      <div class="dynamic-item">

        <input
          type="text"
          class="achievement-title"
          placeholder="Achievement / Certification"
          value="${escapeHtml(item.title)}"
        >

        <input
          type="text"
          class="achievement-issuer"
          placeholder="Issuer"
          value="${escapeHtml(item.issuer)}"
        >

        <input
          type="text"
          class="achievement-date"
          placeholder="Date"
          value="${escapeHtml(item.date)}"
        >

        <button type="button" class="remove-btn">
          Remove
        </button>

      </div>
    `;
  }

  return "";
}


/* =========================
   RENDER LISTS
========================= */

function renderEditorLists() {

  $("educationList").innerHTML =
    data.education
      .map(item => makeEntry("education", item))
      .join("");

  $("experienceList").innerHTML =
    data.experience
      .map(item => makeEntry("experience", item))
      .join("");

  $("projectsList").innerHTML =
    data.projects
      .map(item => makeEntry("project", item))
      .join("");

  $("achievementsList").innerHTML =
    data.achievements
      .map(item => makeEntry("achievement", item))
      .join("");
}


/* =========================
   READ EDUCATION
========================= */

function readEducation() {

  return [...document.querySelectorAll(
    "#educationList .dynamic-item"
  )].map(item => ({
    degree: item.querySelector(".edu-degree").value,
    institute: item.querySelector(".edu-institute").value,
    date: item.querySelector(".edu-date").value,
    details: item.querySelector(".edu-details").value
  }));
}


/* =========================
   READ EXPERIENCE
========================= */

function readExperience() {

  return [...document.querySelectorAll(
    "#experienceList .dynamic-item"
  )].map(item => ({
    role: item.querySelector(".exp-role").value,
    company: item.querySelector(".exp-company").value,
    date: item.querySelector(".exp-date").value,
    bullets:
      item.querySelector(".exp-bullets").value
        .split("\n")
        .map(x => x.trim())
        .filter(Boolean)
        .join("|")
  }));
}


/* =========================
   READ PROJECTS
========================= */

function readProjects() {

  return [...document.querySelectorAll(
    "#projectsList .dynamic-item"
  )].map(item => ({
    name: item.querySelector(".project-name").value,
    tech: item.querySelector(".project-tech").value,
    bullets:
      item.querySelector(".project-bullets").value
        .split("\n")
        .map(x => x.trim())
        .filter(Boolean)
        .join("|")
  }));
}


/* =========================
   READ ACHIEVEMENTS
========================= */

function readAchievements() {

  return [...document.querySelectorAll(
    "#achievementsList .dynamic-item"
  )].map(item => ({
    title: item.querySelector(".achievement-title").value,
    issuer: item.querySelector(".achievement-issuer").value,
    date: item.querySelector(".achievement-date").value
  }));
}


/* =========================
   UPDATE PREVIEW
========================= */

function updateFromEditor() {

  data.education = readEducation();
  data.experience = readExperience();
  data.projects = readProjects();
  data.achievements = readAchievements();


  /* HEADER */

  $("pName").textContent =
    $("name").value || "Your Name";

  $("pTitle").textContent =
    $("title").value || "Professional Title";


  $("pContact").textContent =
    [
      $("email").value,
      $("phone").value,
      $("location").value,
      $("linkedin").value,
      $("github").value
    ]
      .filter(Boolean)
      .join(" | ");


  /* SUMMARY */

  $("pSummary").textContent =
    $("summary").value || "";


  /* SKILLS */

  $("pSkills").innerHTML =
    ($("skills").value || "")
      .split(",")
      .map(skill => skill.trim())
      .filter(Boolean)
      .map(
        skill =>
          `<span>${escapeHtml(skill)}</span>`
      )
      .join("");


  /* EDUCATION */

  $("pEducation").innerHTML =
    data.education
      .map(item => `
        <div class="resume-entry">

          <strong>
            ${escapeHtml(item.degree)}
          </strong>

          <span>
            ${escapeHtml(item.date)}
          </span>

          <div>
            ${escapeHtml(item.institute)}
          </div>

          <small>
            ${escapeHtml(item.details)}
          </small>

        </div>
      `)
      .join("");


  /* EXPERIENCE */

  $("pExperience").innerHTML =
    data.experience
      .map(item => `
        <div class="resume-entry">

          <div class="entry-heading">
            <strong>
              ${escapeHtml(item.role)}
            </strong>

            <span>
              ${escapeHtml(item.date)}
            </span>
          </div>

          <div>
            ${escapeHtml(item.company)}
          </div>

          <ul>
            ${
              (item.bullets || "")
                .split("|")
                .filter(Boolean)
                .map(
                  bullet =>
                    `<li>${escapeHtml(bullet)}</li>`
                )
                .join("")
            }
          </ul>

        </div>
      `)
      .join("");


  /* PROJECTS */

  $("pProjects").innerHTML =
    data.projects
      .map(item => `
        <div class="resume-entry">

          <strong>
            ${escapeHtml(item.name)}
          </strong>

          <div>
            <em>
              ${escapeHtml(item.tech)}
            </em>
          </div>

          <ul>
            ${
              (item.bullets || "")
                .split("|")
                .filter(Boolean)
                .map(
                  bullet =>
                    `<li>${escapeHtml(bullet)}</li>`
                )
                .join("")
            }
          </ul>

        </div>
      `)
      .join("");


  /* ACHIEVEMENTS */

  $("pAchievements").innerHTML =
    data.achievements
      .map(item => `
        <div class="resume-entry">

          <strong>
            ${escapeHtml(item.title)}
          </strong>

          <span>
            ${escapeHtml(item.date)}
          </span>

          <div>
            ${escapeHtml(item.issuer)}
          </div>

        </div>
      `)
      .join("");
}


/* =========================
   LIVE INPUT
========================= */

[
  "name",
  "title",
  "email",
  "phone",
  "location",
  "linkedin",
  "github",
  "summary",
  "skills"
].forEach(id => {

  $(id).addEventListener(
    "input",
    updateFromEditor
  );

});


/* =========================
   ADD EDUCATION
========================= */

$("addEducationBtn").addEventListener(
  "click",
  () => {

    data.education.push({
      degree: "",
      institute: "",
      date: "",
      details: ""
    });

    renderEditorLists();
    updateFromEditor();
  }
);


/* =========================
   ADD EXPERIENCE
========================= */

$("addExperienceBtn").addEventListener(
  "click",
  () => {

    data.experience.push({
      role: "",
      company: "",
      date: "",
      bullets: ""
    });

    renderEditorLists();
    updateFromEditor();
  }
);


/* =========================
   ADD PROJECT
========================= */

$("addProjectBtn").addEventListener(
  "click",
  () => {

    data.projects.push({
      name: "",
      tech: "",
      bullets: ""
    });

    renderEditorLists();
    updateFromEditor();
  }
);


/* =========================
   ADD ACHIEVEMENT
========================= */

$("addAchievementBtn").addEventListener(
  "click",
  () => {

    data.achievements.push({
      title: "",
      issuer: "",
      date: ""
    });

    renderEditorLists();
    updateFromEditor();
  }
);


/* =========================
   REMOVE ITEMS
========================= */

document.addEventListener(
  "click",
  event => {

    if (
      !event.target.classList.contains(
        "remove-btn"
      )
    ) {
      return;
    }

    const item =
      event.target.closest(
        ".dynamic-item"
      );

    if (!item) {
      return;
    }

    item.remove();

    updateFromEditor();
  }
);


/* =========================
   PDF
========================= */

$("downloadPdfBtn").addEventListener(
  "click",
  () => {

    const element =
      $("resumePreview");

    const options = {

      margin: 0,

      filename:
        "resume.pdf",

      image: {
        type: "jpeg",
        quality: 0.98
      },

      html2canvas: {
        scale: 2,
        useCORS: true
      },

      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait"
      },

      pagebreak: {
        mode: ["avoid-all"]
      }
    };


    html2pdf()
      .set(options)
      .from(element)
      .save();
  }
);


/* =========================
   RESET
========================= */

$("clearBtn").addEventListener(
  "click",
  () => {

    if (
      !confirm(
        "Are you sure you want to reset the resume?"
      )
    ) {
      return;
    }

    currentResumeId = null;

    data =
      structuredClone(defaultData);


    $("name").value =
      "Sneha Goyal";

    $("title").value =
      "Java Full Stack Developer";

    $("email").value =
      "your.email@example.com";

    $("phone").value =
      "+91 XXXXX XXXXX";

    $("location").value =
      "Ghaziabad, Uttar Pradesh, India";

    $("linkedin").value =
      "linkedin.com/in/sneha-goyal-CSE";

    $("github").value =
      "github.com/yourusername";

    $("summary").value =
      "B.Tech Computer Science student interested in Java Full Stack Development, with hands-on experience in web development, software testing, and building practical applications.";

    $("skills").value =
      "Java, JavaScript, HTML, CSS, SQL, MySQL, Git, GitHub, Spring Boot";


    renderEditorLists();
    updateFromEditor();
  }
);


/* =========================
   SAVE / UPDATE
========================= */

$("saveResumeBtn").addEventListener(
  "click",
  async () => {

    const resumeData = {

      fullName:
        $("name").value,

      professionalTitle:
        $("title").value,

      email:
        $("email").value,

      phone:
        $("phone").value,

      location:
        $("location").value,

      linkedin:
        $("linkedin").value,

      github:
        $("github").value,

      summary:
        $("summary").value,

      skills:
        $("skills").value,

      education:
        JSON.stringify(data.education),

      experience:
        JSON.stringify(data.experience),

      projects:
        JSON.stringify(data.projects),

      certifications:
        JSON.stringify(data.achievements)
    };


    try {

      const url =
        currentResumeId
          ? `http://127.0.0.1:8080/api/resumes/${currentResumeId}`
          : "http://127.0.0.1:8080/api/resumes";


      const method =
        currentResumeId
          ? "PUT"
          : "POST";


      const response =
        await fetch(
          url,
          {
            method: method,

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify(resumeData)
          }
        );


      if (!response.ok) {
        throw new Error(
          "Failed to save/update resume"
        );
      }


      const savedResume =
        await response.json();


      currentResumeId =
        savedResume.id;


      if (method === "PUT") {

        alert(
          "Resume updated successfully!"
        );

      } else {

        alert(
          "Resume saved successfully! ID: " +
          savedResume.id
        );
      }

    } catch (error) {

      console.error(
        "Error saving/updating resume:",
        error
      );

      alert(
        "Could not save resume. Make sure Spring Boot backend is running."
      );
    }
  }
);


/* =========================
   LOAD RESUMES
========================= */

$("loadResumesBtn").addEventListener(
  "click",
  loadResumes
);


async function loadResumes() {

  const savedResumesList =
    $("savedResumesList");


  savedResumesList.innerHTML =
    "<p>Loading saved resumes...</p>";


  try {

    const response =
      await fetch(
        "http://127.0.0.1:8080/api/resumes"
      );


    if (!response.ok) {
      throw new Error(
        "Failed to load resumes"
      );
    }


    const resumes =
      await response.json();


    if (resumes.length === 0) {

      savedResumesList.innerHTML =
        "<p>No saved resumes found.</p>";

      return;
    }


    savedResumesList.innerHTML = "";


    resumes.forEach(resume => {

      const card =
        document.createElement("div");


      card.className =
        "saved-resume-item";


      card.innerHTML = `

        <h3>
          ${escapeHtml(
            resume.fullName ||
            "Unnamed Resume"
          )}
        </h3>

        <p>
          ${escapeHtml(
            resume.professionalTitle ||
            "No title"
          )}
        </p>

        <p>
          ${escapeHtml(
            resume.email ||
            "No email"
          )}
        </p>

        <small>
          Resume ID: ${resume.id}
        </small>

        <br><br>

        <button
          class="secondary-btn edit-resume-btn"
          data-id="${resume.id}"
          type="button"
        >
          Open / Edit
        </button>

        <button
          class="delete-resume-btn"
          data-id="${resume.id}"
          type="button"
        >
          Delete
        </button>

      `;


      savedResumesList.appendChild(card);
    });


    /* OPEN / EDIT */

    document
      .querySelectorAll(
        ".edit-resume-btn"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => openResume(
            button.dataset.id
          )
        );

      });


    /* DELETE */

    document
      .querySelectorAll(
        ".delete-resume-btn"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => deleteResume(
            button.dataset.id
          )
        );

      });


  } catch (error) {

    console.error(
      "Error loading resumes:",
      error
    );

    savedResumesList.innerHTML =
      "<p>Could not load saved resumes.</p>";
  }
}


/* =========================
   OPEN / EDIT RESUME
========================= */

async function openResume(resumeId) {

  try {

    const response =
      await fetch(
        `http://127.0.0.1:8080/api/resumes/${resumeId}`
      );


    if (!response.ok) {
      throw new Error(
        "Failed to load resume"
      );
    }


    const resume =
      await response.json();


    currentResumeId =
      resume.id;


    $("name").value =
      resume.fullName || "";

    $("title").value =
      resume.professionalTitle || "";

    $("email").value =
      resume.email || "";

    $("phone").value =
      resume.phone || "";

    $("location").value =
      resume.location || "";

    $("linkedin").value =
      resume.linkedin || "";

    $("github").value =
      resume.github || "";

    $("summary").value =
      resume.summary || "";

    $("skills").value =
      resume.skills || "";


    data.education =
      JSON.parse(
        resume.education || "[]"
      );

    data.experience =
      JSON.parse(
        resume.experience || "[]"
      );

    data.projects =
      JSON.parse(
        resume.projects || "[]"
      );

    data.achievements =
      JSON.parse(
        resume.certifications || "[]"
      );


    renderEditorLists();
    updateFromEditor();


    alert(
      "Resume loaded successfully!"
    );

  } catch (error) {

    console.error(
      "Error opening resume:",
      error
    );

    alert(
      "Could not open resume. Make sure Spring Boot backend is running."
    );
  }
}


/* =========================
   DELETE RESUME
========================= */

async function deleteResume(resumeId) {

  const confirmDelete =
    confirm(
      "Are you sure you want to delete this resume?"
    );


  if (!confirmDelete) {
    return;
  }


  try {

    const response =
      await fetch(
        `http://127.0.0.1:8080/api/resumes/${resumeId}`,
        {
          method: "DELETE"
        }
      );


    if (!response.ok) {
      throw new Error(
        "Failed to delete resume"
      );
    }


    if (
      String(currentResumeId) ===
      String(resumeId)
    ) {
      currentResumeId = null;
    }


    alert(
      "Resume deleted successfully!"
    );


    await loadResumes();

  } catch (error) {

    console.error(
      "Error deleting resume:",
      error
    );

    alert(
      "Could not delete resume. Make sure Spring Boot backend is running."
    );
  }
}


/* =========================
   INITIALIZE
========================= */

renderEditorLists();
updateFromEditor();