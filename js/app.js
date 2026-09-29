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

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function makeEntry(container, type, item) {
  const entry = document.createElement("div");
  entry.className = "entry";
  entry.dataset.type = type;

  if (type === "education") {
    entry.innerHTML = `
      <div class="entry-grid">

        <label>
          Degree
          <input data-key="degree" value="${escapeHtml(item.degree)}">
        </label>

        <label>
          Institute
          <input data-key="institute" value="${escapeHtml(item.institute)}">
        </label>

        <label>
          Date
          <input data-key="date" value="${escapeHtml(item.date)}">
        </label>

        <label>
          Details
          <input data-key="details" value="${escapeHtml(item.details)}">
        </label>

      </div>

      <div class="entry-actions">
        <button class="remove-btn" type="button">Remove</button>
      </div>
    `;
  }

  else if (type === "experience") {
    entry.innerHTML = `
      <div class="entry-grid">

        <label>
          Role
          <input data-key="role" value="${escapeHtml(item.role)}">
        </label>

        <label>
          Company
          <input data-key="company" value="${escapeHtml(item.company)}">
        </label>

        <label>
          Date
          <input data-key="date" value="${escapeHtml(item.date)}">
        </label>

        <label class="full">
          Bullet points
          <span class="hint">
            Separate each bullet with |
          </span>

          <textarea data-key="bullets" rows="4">${escapeHtml(item.bullets)}</textarea>
        </label>

      </div>

      <div class="entry-actions">
        <button class="remove-btn" type="button">Remove</button>
      </div>
    `;
  }

  else if (type === "project") {
    entry.innerHTML = `
      <div class="entry-grid">

        <label>
          Project Name
          <input data-key="name" value="${escapeHtml(item.name)}">
        </label>

        <label>
          Technologies
          <input data-key="tech" value="${escapeHtml(item.tech)}">
        </label>

        <label class="full">
          Bullet points
          <span class="hint">
            Separate each bullet with |
          </span>

          <textarea data-key="bullets" rows="4">${escapeHtml(item.bullets)}</textarea>
        </label>

      </div>

      <div class="entry-actions">
        <button class="remove-btn" type="button">Remove</button>
      </div>
    `;
  }

  else {
    entry.innerHTML = `
      <div class="entry-grid">

        <label>
          Title
          <input data-key="title" value="${escapeHtml(item.title)}">
        </label>

        <label>
          Issuer
          <input data-key="issuer" value="${escapeHtml(item.issuer)}">
        </label>

        <label>
          Date
          <input data-key="date" value="${escapeHtml(item.date)}">
        </label>

      </div>

      <div class="entry-actions">
        <button class="remove-btn" type="button">Remove</button>
      </div>
    `;
  }

  entry.querySelectorAll("input, textarea").forEach((el) => {
    el.addEventListener("input", updateFromEditor);
  });

  entry.querySelector(".remove-btn").addEventListener("click", () => {
    entry.remove();
    updateFromEditor();
  });

  container.appendChild(entry);
}

function renderEditorLists() {
  $("educationList").innerHTML = "";
  $("experienceList").innerHTML = "";
  $("projectsList").innerHTML = "";
  $("achievementsList").innerHTML = "";

  data.education.forEach((item) => {
    makeEntry($("educationList"), "education", item);
  });

  data.experience.forEach((item) => {
    makeEntry($("experienceList"), "experience", item);
  });

  data.projects.forEach((item) => {
    makeEntry($("projectsList"), "project", item);
  });

  data.achievements.forEach((item) => {
    makeEntry($("achievementsList"), "achievement", item);
  });
}

function readList(containerId) {
  return [...$(containerId).querySelectorAll(".entry")].map((entry) => {
    const obj = {};

    entry.querySelectorAll("[data-key]").forEach((el) => {
      obj[el.dataset.key] = el.value;
    });

    return obj;
  });
}

function updateFromEditor() {

  data.education = readList("educationList");
  data.experience = readList("experienceList");
  data.projects = readList("projectsList");
  data.achievements = readList("achievementsList");

  /* PERSONAL INFORMATION */

  $("pName").textContent =
    $("name").value || "Your Name";

  $("pTitle").textContent =
    $("title").value || "Professional Title";

  const contact = [
    $("email").value,
    $("phone").value,
    $("location").value,
    $("linkedin").value,
    $("github").value
  ]
    .filter(Boolean)
    .map(escapeHtml)
    .join(" | ");

  $("pContact").innerHTML = contact;


  /* SUMMARY */

  $("pSummary").textContent =
    $("summary").value;

  $("pSummarySection").style.display =
    $("summary").value.trim() ? "" : "none";


  /* SKILLS */

  const skills = $("skills").value
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  $("pSkills").innerHTML = skills
    .map(
      (skill) =>
        `<span class="skill">${escapeHtml(skill)}</span>`
    )
    .join("");

  $("pSkillsSection").style.display =
    skills.length ? "" : "none";


  /* EDUCATION */

  $("pEducation").innerHTML =
    data.education
      .map(
        (education) => `
          <div class="resume-entry">

            <div class="entry-top">
              <strong>
                ${escapeHtml(education.degree)}
              </strong>

              <span class="date">
                ${escapeHtml(education.date)}
              </span>
            </div>

            <div class="sub">
              ${escapeHtml(education.institute)}
              ${
                education.details
                  ? " — " + escapeHtml(education.details)
                  : ""
              }
            </div>

          </div>
        `
      )
      .join("");

  $("pEducationSection").style.display =
    data.education.length ? "" : "none";


  /* EXPERIENCE */

  $("pExperience").innerHTML =
    data.experience
      .map(
        (experience) => `
          <div class="resume-entry">

            <div class="entry-top">

              <strong>
                ${escapeHtml(experience.role)}
                — 
                ${escapeHtml(experience.company)}
              </strong>

              <span class="date">
                ${escapeHtml(experience.date)}
              </span>

            </div>

            <ul>

              ${String(experience.bullets || "")
                .split("|")
                .map((bullet) => bullet.trim())
                .filter(Boolean)
                .map(
                  (bullet) =>
                    `<li>${escapeHtml(bullet)}</li>`
                )
                .join("")}

            </ul>

          </div>
        `
      )
      .join("");

  $("pExperienceSection").style.display =
    data.experience.length ? "" : "none";


  /* PROJECTS */

  $("pProjects").innerHTML =
    data.projects
      .map(
        (project) => `
          <div class="resume-entry">

            <div class="entry-top">

              <strong>
                ${escapeHtml(project.name)}
              </strong>

              <span class="date">
                ${escapeHtml(project.tech)}
              </span>

            </div>

            <ul>

              ${String(project.bullets || "")
                .split("|")
                .map((bullet) => bullet.trim())
                .filter(Boolean)
                .map(
                  (bullet) =>
                    `<li>${escapeHtml(bullet)}</li>`
                )
                .join("")}

            </ul>

          </div>
        `
      )
      .join("");

  $("pProjectsSection").style.display =
    data.projects.length ? "" : "none";


  /* ACHIEVEMENTS */

  $("pAchievements").innerHTML =
    data.achievements
      .map(
        (achievement) => `
          <div class="resume-entry">

            <div class="entry-top">

              <strong>
                ${escapeHtml(achievement.title)}
              </strong>

              <span class="date">
                ${escapeHtml(achievement.date)}
              </span>

            </div>

            <div class="sub">
              ${escapeHtml(achievement.issuer)}
            </div>

          </div>
        `
      )
      .join("");

  $("pAchievementsSection").style.display =
    data.achievements.length ? "" : "none";
}


/* BASIC INPUTS */

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
].forEach((id) => {
  $(id).addEventListener("input", updateFromEditor);
});


/* ADD EDUCATION */

$("addEducationBtn").addEventListener("click", () => {

  makeEntry(
    $("educationList"),
    "education",
    {
      degree: "",
      institute: "",
      date: "",
      details: ""
    }
  );

  updateFromEditor();
});


/* ADD EXPERIENCE */

$("addExperienceBtn").addEventListener("click", () => {

  makeEntry(
    $("experienceList"),
    "experience",
    {
      role: "",
      company: "",
      date: "",
      bullets: ""
    }
  );

  updateFromEditor();
});


/* ADD PROJECT */

$("addProjectBtn").addEventListener("click", () => {

  makeEntry(
    $("projectsList"),
    "project",
    {
      name: "",
      tech: "",
      bullets: ""
    }
  );

  updateFromEditor();
});


/* ADD ACHIEVEMENT */

$("addAchievementBtn").addEventListener("click", () => {

  makeEntry(
    $("achievementsList"),
    "achievement",
    {
      title: "",
      issuer: "",
      date: ""
    }
  );

  updateFromEditor();
});


/* DOWNLOAD PDF */

$("downloadPdfBtn").addEventListener("click", () => {

  updateFromEditor();

  const element = $("resumePreview");

  const options = {

    margin: 0,

    filename:
      `${$("name").value.trim() || "Resume"}_Resume.pdf`,

    image: {
      type: "jpeg",
      quality: 0.98
    },

    html2canvas: {
      scale: 1.5,
      useCORS: true
    },

    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait"
    },

    pagebreak: {
      mode: ["css"]
    }
  };

  html2pdf()
    .set(options)
    .from(element)
    .save();
});


/* RESET */

$("clearBtn").addEventListener("click", () => {

  if (
    !confirm(
      "Reset the resume to the starter data?"
    )
  ) {
    return;
  }

  location.reload();
});


/* INITIAL LOAD */

renderEditorLists();

updateFromEditor();