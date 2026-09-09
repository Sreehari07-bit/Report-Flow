import { useEffect, useMemo, useState } from "react";
import "./App.css";

const initialReports = [
  {
    id: 1,
    title: "Faculty Development Programme",
    department: "Computer Science",
    date: "Sep 05, 2026",
    status: "Completed",
    type: "Event Report",
  },
  {
    id: 2,
    title: "AI & Machine Learning Workshop",
    department: "Computer Science",
    date: "Sep 03, 2026",
    status: "Processing",
    type: "Workshop",
  },
  {
    id: 3,
    title: "Technical Seminar",
    department: "Information Technology",
    date: "Sep 01, 2026",
    status: "Completed",
    type: "Seminar",
  },
  {
    id: 4,
    title: "Student Orientation Programme",
    department: "Engineering",
    date: "Aug 28, 2026",
    status: "Completed",
    type: "Programme",
  },
];

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const icons = {
    home: (
      <>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9 21v-6h6v6" />
      </>
    ),
    reports: (
      <>
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6" />
        <path d="M9 17h6" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
    template: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M8 8h8" />
        <path d="M8 12h5" />
        <path d="M8 16h3" />
      </>
    ),
    analytics: (
      <>
        <path d="M4 19V9" />
        <path d="M10 19V5" />
        <path d="M16 19v-7" />
        <path d="M22 19H2" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7 7 0 0 0-2-1.2L14.3 3h-4.6l-.3 2.7a7 7 0 0 0-2 1.2l-2.3-1-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 2 1.2l.3 2.7h4.6l.3-2.7a7 7 0 0 0 2-1.2l2.3 1 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    bell: (
      <>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5Z" />
        <path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7Z" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    back: (
      <>
        <path d="M19 12H5" />
        <path d="m11 18-6-6 6-6" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V4" />
        <path d="m7 9 5-5 5 5" />
        <path d="M5 20h14" />
      </>
    ),
    download: (
      <>
        <path d="M12 4v12" />
        <path d="m7 11 5 5 5-5" />
        <path d="M5 20h14" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    file: (
      <>
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M14 3v5h5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    eye: (
      <>
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    logout: (
      <>
        <path d="M10 4H5v16h5" />
        <path d="M14 8l4 4-4 4" />
        <path d="M9 12h9" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </>
    ),
    folder: (
      <>
        <path d="M3 7h7l2 2h9v10H3z" />
        <path d="M3 7V5h7l2 2" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  };

  return <svg {...common}>{icons[name]}</svg>;
}

function Logo({ light = false }) {
  return (
    <div className={`brand ${light ? "brand-light" : ""}`}>
      <div className="brand-mark">
        <Icon name="spark" size={22} />
      </div>

      <div className="brand-text">
        <div className="brand-name">ReportFlow</div>
        <div className="brand-ai">AI</div>
      </div>
    </div>
  );
}

function LoginPage({ onLogin }) {
  const [mode, setMode] = useState("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const submit = (event) => {
    event.preventDefault();

    if (!email || !password || (mode === "signup" && !fullName)) {
      setMessage("Please complete all required fields.");
      return;
    }

    onLogin({
      name: mode === "signup" ? fullName : "Agile Shijo John",
      email,
    });
  };

  return (
    <div className="login-page">
      <section className="login-showcase">
        <div className="showcase-brand">
          <Logo light />
        </div>

        <div className="showcase-content">
          <div className="mini-pill">
            <span />
            SMART FACULTY WORKSPACE
          </div>

          <h1>
            Your events.
            <br />
            <em>Perfectly documented.</em>
          </h1>

          <p>
            Transform event information into polished, structured faculty
            reports with less repetitive work and more time for what matters.
          </p>

          <div className="showcase-stats">
            <div>
              <strong>10×</strong>
              <span>Faster reporting</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Structured output</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>AI assistance</span>
            </div>
          </div>
        </div>

        <div className="showcase-bottom">
          <span>Faculty documentation, reimagined.</span>
          <span>© 2026 ReportFlow AI</span>
        </div>
      </section>

      <section className="login-panel">
        <div className="auth-card">
          <div className="mobile-brand">
            <Logo />
          </div>

          <div className="auth-heading">
            <span className="auth-kicker">
              {mode === "signin" ? "WELCOME BACK" : "GET STARTED"}
            </span>

            <h2>
              {mode === "signin"
                ? "Welcome back."
                : "Create your workspace."}
            </h2>

            <p>
              {mode === "signin"
                ? "Sign in to continue to your ReportFlow workspace."
                : "Create your account and start automating faculty reports."}
            </p>
          </div>

          <div className="auth-switch">
            <button
              className={mode === "signin" ? "active" : ""}
              onClick={() => {
                setMode("signin");
                setMessage("");
              }}
            >
              Sign In
            </button>

            <button
              className={mode === "signup" ? "active" : ""}
              onClick={() => {
                setMode("signup");
                setMessage("");
              }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={submit} className="auth-form">
            {mode === "signup" && (
              <label>
                Full name

                <div className="input-wrap">
                  <Icon name="file" size={18} />

                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
              </label>
            )}

            <label>
              Email address

              <div className="input-wrap">
                <Icon name="mail" size={18} />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            </label>

            <label>
              Password

              <div className="input-wrap">
                <Icon name="lock" size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            {mode === "signin" && (
              <div className="auth-options">
                <label className="remember">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  className="forgot-button"
                  onClick={() =>
                    setMessage(
                      "Password reset will be connected to the backend."
                    )
                  }
                >
                  Forgot password?
                </button>
              </div>
            )}

            {message && <div className="auth-message">{message}</div>}

            <button className="primary-auth-button" type="submit">
              <span>
                {mode === "signin"
                  ? "Sign in to workspace"
                  : "Create account"}
              </span>

              <Icon name="arrow" size={18} />
            </button>
          </form>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <button
            className="google-button"
            onClick={() =>
              setMessage(
                "Google authentication will be connected to the backend."
              )
            }
          >
            <span className="google-letter">G</span>
            Continue with Google
          </button>

          <p className="auth-terms">
            By continuing, you agree to the platform's terms and privacy
            policy.
          </p>
        </div>
      </section>
    </div>
  );
}

function Sidebar({
  page,
  setPage,
  mobileOpen,
  setMobileOpen,
  onLogout,
}) {
  const navigation = [
    ["home", "Dashboard", "dashboard"],
    ["plus", "Create Report", "create"],
    ["reports", "My Reports", "reports"],
    ["template", "Templates", "templates"],
    ["analytics", "Analytics", "analytics"],
  ];

  return (
    <>
      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <Logo />

          <button
            className="sidebar-close"
            onClick={() => setMobileOpen(false)}
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="workspace-simple">
          <div className="workspace-avatar">A</div>

          <div className="workspace-details">
            <strong>Faculty Workspace</strong>
            <span>Academic Reports</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <span className="nav-title">WORKSPACE</span>

          {navigation.map(([icon, label, value]) => (
            <button
              key={value}
              className={page === value ? "active" : ""}
              onClick={() => {
                setPage(value);
                setMobileOpen(false);
              }}
            >
              <span className="nav-icon">
                <Icon name={icon} size={20} />
              </span>

              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            className={page === "settings" ? "active" : ""}
            onClick={() => {
              setPage("settings");
              setMobileOpen(false);
            }}
          >
            <span className="nav-icon">
              <Icon name="settings" size={20} />
            </span>

            <span>Settings</span>
          </button>

          <div className="sidebar-account">
            <div className="account-info">
              <div className="user-avatar">AS</div>

              <div>
                <strong>Agile Shijo John</strong>
                <span>Faculty Member</span>
              </div>
            </div>

            <button
              className="logout-button"
              onClick={onLogout}
            >
              <Icon name="logout" size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function Header({ onMenu }) {
  return (
    <header className="topbar">
      <button className="mobile-menu" onClick={onMenu}>
        <Icon name="menu" size={22} />
      </button>

      <div className="topbar-search">
        <Icon name="search" size={19} />
        <input placeholder="Search reports, events..." />
        <kbd>⌘ K</kbd>
      </div>

      <div className="topbar-actions">
        <button className="notification-button">
          <Icon name="bell" size={20} />
          <span />
        </button>

        <div className="topbar-divider" />

        <div className="profile-mini">
          <div className="profile-avatar">AS</div>

          <div>
            <strong>Agile Shijo John</strong>
            <span>Faculty Member</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function StatCard({
  icon,
  label,
  value,
  note,
  trend,
  type,
}) {
  return (
    <div className={`stat-card ${type || ""}`}>
      <div className="stat-card-top">
        <div className="stat-icon">
          <Icon name={icon} size={20} />
        </div>

        {trend && <span className="stat-trend">{trend}</span>}
      </div>

      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-note">{note}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const completed = status === "Completed";

  return (
    <span className={`status-badge ${completed ? "completed" : "processing"}`}>
      <span />
      {status}
    </span>
  );
}

function Dashboard({ reports, setPage }) {
  const completed = reports.filter(
    (report) => report.status === "Completed"
  ).length;

  const processing = reports.filter(
    (report) => report.status === "Processing"
  ).length;

  return (
    <div className="page-content dashboard-page">
      <div className="dashboard-hero">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="live-dot" />
            YOUR WORKSPACE
          </div>

          <h1>
            Good morning, <span>Agile.</span>
          </h1>

          <p>
            Everything you need to create, manage, and organize your faculty
            event reports — all in one place.
          </p>

          <div className="hero-actions">
            <button
              className="hero-primary"
              onClick={() => setPage("create")}
            >
              <span className="hero-button-icon">
                <Icon name="plus" size={18} />
              </span>

              Create New Report

              <Icon name="arrow" size={17} />
            </button>

            <button
              className="hero-secondary"
              onClick={() => setPage("reports")}
            >
              View All Reports
              <Icon name="arrow" size={16} />
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-ring ring-one" />
          <div className="hero-ring ring-two" />

          <div className="floating-card floating-card-top">
            <span className="floating-check">
              <Icon name="check" size={14} />
            </span>

            <div>
              <strong>Report generated</strong>
              <span>Just now</span>
            </div>
          </div>

          <div className="hero-document">
            <div className="document-glow" />

            <div className="document-top">
              <span />
              <span />
              <span />
            </div>

            <div className="document-heading" />
            <div className="document-line long" />
            <div className="document-line medium" />
            <div className="document-line short" />

            <div className="document-section">
              <div />
              <div />
              <div />
            </div>

            <div className="document-footer">
              <Icon name="spark" size={13} />
              Generated by ReportFlow AI
            </div>
          </div>

          <div className="floating-card floating-card-bottom">
            <div className="mini-progress">
              <span />
            </div>

            <div>
              <strong>AI processing</strong>
              <span>Structured output</span>
            </div>
          </div>
        </div>
      </div>

      <div className="section-heading">
        <span className="section-kicker">OVERVIEW</span>
        <h2>Your reporting at a glance</h2>
      </div>

      <div className="stats-grid">
        <StatCard
          icon="reports"
          value={reports.length}
          label="Total Reports"
          note="All your generated reports"
          trend="+12%"
        />

        <StatCard
          icon="check"
          value={completed}
          label="Completed"
          note="Ready to download"
          trend="Good"
          type="success"
        />

        <StatCard
          icon="clock"
          value={processing}
          label="Processing"
          note="Currently being generated"
          type="warning"
        />

        <StatCard
          icon="spark"
          value="98%"
          label="Automation Score"
          note="Average report quality"
          trend="+4.2%"
          type="accent"
        />
      </div>

      <div className="dashboard-columns">
        <section className="panel reports-panel">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">RECENT ACTIVITY</span>
              <h2>Recent Reports</h2>
            </div>

            <button
              className="text-button"
              onClick={() => setPage("reports")}
            >
              View All
              <Icon name="arrow" size={15} />
            </button>
          </div>

          <div className="report-table">
            <div className="table-header">
              <span>REPORT</span>
              <span>DEPARTMENT</span>
              <span>DATE</span>
              <span>STATUS</span>
            </div>

            {reports.slice(0, 4).map((report) => (
              <div className="table-row" key={report.id}>
                <div className="report-name">
                  <div className="report-file-icon">
                    <Icon name="file" size={17} />
                  </div>

                  <div>
                    <strong>{report.title}</strong>
                    <span>{report.type}</span>
                  </div>
                </div>

                <span className="department">{report.department}</span>
                <span className="date">{report.date}</span>

                <StatusBadge status={report.status} />
              </div>
            ))}
          </div>
        </section>

        <section className="panel quick-panel">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">SHORTCUTS</span>
              <h2>Quick Actions</h2>
            </div>
          </div>

          <div className="quick-list">
            <button onClick={() => setPage("create")}>
              <div className="quick-icon purple">
                <Icon name="plus" size={20} />
              </div>

              <div>
                <strong>Create a Report</strong>
                <span>Start from your event details</span>
              </div>

              <Icon name="arrow" size={16} />
            </button>

            <button onClick={() => setPage("templates")}>
              <div className="quick-icon blue">
                <Icon name="template" size={20} />
              </div>

              <div>
                <strong>Browse Templates</strong>
                <span>Choose a ready-made format</span>
              </div>

              <Icon name="arrow" size={16} />
            </button>

            <button onClick={() => setPage("reports")}>
              <div className="quick-icon green">
                <Icon name="folder" size={20} />
              </div>

              <div>
                <strong>Manage Reports</strong>
                <span>View your complete history</span>
              </div>

              <Icon name="arrow" size={16} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function CreateReport({ onBack, onGenerate }) {
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [department, setDepartment] = useState("Computer Science");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [organizingTeam, setOrganizingTeam] = useState("");
  const [description, setDescription] = useState("");
  const [objectives, setObjectives] = useState("");
 const [previewFile, setPreviewFile] = useState(null);
  const [fileMessage, setFileMessage] = useState("");
  const [files, setFiles] = useState([]);

  const imagePreviewUrls = useMemo(() => {
  const previewMap = new Map();

  files.forEach((file) => {
    if (file.type.startsWith("image/")) {
      const key = `${file.name}-${file.size}-${file.lastModified}`;
      previewMap.set(key, URL.createObjectURL(file));
    }
  });

  return previewMap;
}, [files]);

  useEffect(() => {
    return () => {
      imagePreviewUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [imagePreviewUrls]);

  const submit = (event) => {
    event.preventDefault();

    onGenerate({
      title: title || "Untitled Faculty Event",
      eventType,
      department: department || "General",
      date: date
        ? new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })
        : "Sep 07, 2026",
      venue,
      coordinator,
      organizingTeam,
      description,
      objectives,
      files,
    });
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    const allowedExtensions = [
      "pdf",
      "docx",
      "xlsx",
      "csv",
      "jpg",
      "jpeg",
      "png",
    ];

    const maxFileSize = 10 * 1024 * 1024;

    const validFiles = [];
    const invalidFiles = [];

    selectedFiles.forEach((file) => {
      const extension = file.name.split(".").pop().toLowerCase();

      const isValidType = allowedExtensions.includes(extension);
      const isValidSize = file.size <= maxFileSize;

      if (isValidType && isValidSize) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      setFileMessage(
        "Some files were skipped. Only PDF, DOCX, XLSX, CSV, JPG, and PNG files up to 10MB are allowed."
      );
    } else {
      setFileMessage("");
    }

    setFiles((previousFiles) => [...previousFiles, ...validFiles]);

    event.target.value = "";
  };

  const removeFile = (indexToRemove) => {
    setFiles((previousFiles) =>
      previousFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="page-content inner-page">
      <button className="back-button" onClick={onBack}>
        <Icon name="back" size={17} />
        Back to Dashboard
      </button>

      <div className="inner-heading">
        <span className="section-kicker">NEW REPORT</span>
        <h1>Create an Event Report</h1>
        <p>
          Add your event information and supporting documents. ReportFlow AI
          will handle the rest.
        </p>
      </div>

      <form className="create-layout" onSubmit={submit}>
        <div className="form-main panel">
          <div className="form-section-heading">
            <div className="number-badge">01</div>

            <div>
              <h3>Event Information</h3>
              <p>Tell us about the event you want to document.</p>
            </div>
          </div>

          <div className="form-grid">
            <label>
              Event Title

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter event title"
              />
            </label>

            <label>
              Event Type

              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option value="">Select event type</option>
                <option value="Seminar">Seminar</option>
                <option value="Workshop">Workshop</option>
                <option value="Conference">Conference</option>
                <option value="Webinar">Webinar</option>
                <option value="Competition">Competition</option>
                <option value="Cultural Event">Cultural Event</option>
                <option value="Programme">Programme</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label>
              Department

              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select department</option>
                <option>Computer Science</option>
                <option>Information Technology</option>
                <option>Engineering</option>
                <option>Management</option>
                <option>Science</option>
              </select>
            </label>

            <label>
              Event Date

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>

            <label>
              Venue

              <input
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Enter venue"
              />
            </label>

            <label>
              Coordinator

              <input
                value={coordinator}
                onChange={(e) => setCoordinator(e.target.value)}
                placeholder="Enter coordinator name"
              />
            </label>

            <label>
              Organizing Team

              <input
                value={organizingTeam}
                onChange={(e) => setOrganizingTeam(e.target.value)}
                placeholder="Enter organizing team"
              />
            </label>

            <label className="full">
              Event Description

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe the event, activities, speakers, outcomes, and other important details..."
                rows="6"
              />
            </label>

            <label className="full">
              Objectives

              <textarea
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
                placeholder="Enter the objectives of the event..."
                rows="4"
              />
            </label>
          </div>

          <div className="form-divider" />

          <div className="form-section-heading">
            <div className="number-badge">02</div>

            <div>
              <h3>Supporting Documents</h3>
              <p>
                Upload invitations, attendance sheets, photos, or other useful
                files.
              </p>
            </div>
          </div>

          <label
  className="upload-box"
  onDragOver={(event) => {
    event.preventDefault();
    event.currentTarget.classList.add("drag-over");
  }}
  onDragLeave={(event) => {
    event.currentTarget.classList.remove("drag-over");
  }}
  onDrop={(event) => {
    event.preventDefault();
    event.currentTarget.classList.remove("drag-over");

    const droppedFiles = Array.from(event.dataTransfer.files);

    handleFileChange({
      target: {
        files: droppedFiles,
      },
    });
  }}
>
            <input
              type="file"
              multiple
              accept=".pdf,.docx,.xlsx,.csv,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />

            <div className="upload-icon">
              <Icon name="upload" size={24} />
            </div>

            <strong>Drop your files here or browse</strong>

            <span>
              PDF, DOCX, XLSX, CSV, JPG, PNG up to 10MB each
            </span>

            {fileMessage && (
              <span
                style={{
                  color: "#a47e50",
                  marginTop: "8px",
                  fontSize: "8px",
                  maxWidth: "90%",
                }}
              >
                {fileMessage}
              </span>
            )}

            {files.length > 0 && (
              <div
                className="selected-files"
                onClick={(event) => event.stopPropagation()}
              >
                {files.map((file, index) => {
                  const fileExtension = file.name
                    .split(".")
                    .pop()
                    .toUpperCase();

                  const fileSize =
                    file.size < 1024 * 1024
                      ? `${(file.size / 1024).toFixed(1)} KB`
                      : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

                  const previewKey = `${file.name}-${file.size}-${file.lastModified}`;
                  const previewUrl = imagePreviewUrls.get(previewKey);

                  return (
                    <span
                      key={`${file.name}-${index}`}
                      className="selected-file"
                    >
                      {previewUrl && (
                        <button
  type="button"
  className="file-preview-button"
  onClick={(event) => {
    event.preventDefault();
    event.stopPropagation();
    setPreviewFile(file);
  }}
>
  <img
    src={previewUrl}
    className="file-preview-image"
    alt={file.name}
  />
</button>
                      )}

                      <strong>{fileExtension}</strong>

                      {file.name} · {fileSize}

                      <button
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          removeFile(index);
                        }}
                        aria-label={`Remove ${file.name}`}
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            )}
          </label>
        </div>

        <aside className="create-sidebar">
          <div className="ai-info-card">
            <div className="ai-info-icon">
              <Icon name="spark" size={21} />
            </div>

            <h3>Let AI do the heavy lifting.</h3>

            <p>
              ReportFlow AI analyzes your information and documents to create
              a structured, professional event report.
            </p>

            <div className="ai-steps">
              <div>
                <span>1</span>
                Upload information
              </div>

              <div>
                <span>2</span>
                AI organizes details
              </div>

              <div>
                <span>3</span>
                Review your report
              </div>
            </div>
          </div>

          <button className="generate-button" type="submit">
            <Icon name="spark" size={18} />
            Generate Report
            <Icon name="arrow" size={17} />
          </button>

          <p className="form-note">
            You can review and edit the generated report before downloading.
          </p>
        </aside>
      </form>
      {previewFile && (
  <div
    className="image-preview-modal"
    onClick={() => setPreviewFile(null)}
  >
    <div
      className="image-preview-content"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className="image-preview-close"
        onClick={() => setPreviewFile(null)}
      >
        ×
      </button>

      <img
        src={imagePreviewUrls.get(
  `${previewFile.name}-${previewFile.size}-${previewFile.lastModified}`)}
        alt={previewFile.name}
        className="large-preview-image"
      />

      <p>{previewFile.name}</p>
    </div>
  </div>
)}
    </div>
  );  
}

function Processing({ report, onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          clearInterval(timer);
          return 100;
        }

        return current + 5;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div className="processing-page">
      <div className="processing-card">
        <div className="processing-orbit">
          <div className="processing-core">
            <Icon name="spark" size={28} />
          </div>
        </div>

        <span className="section-kicker center">
          REPORTFLOW AI
        </span>

        <h1>Building Your Report</h1>

        <p>
          We're organizing the event information and preparing a polished
          faculty-ready report.
        </p>

        <div className="progress-area">
          <div className="progress-label">
            <span>Generating report...</span>
            <strong>{progress}%</strong>
          </div>

          <div className="progress-track">
            <div style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="processing-steps">
          <div className={progress >= 20 ? "done" : "active"}>
            <span>
              {progress >= 20 ? <Icon name="check" size={12} /> : "1"}
            </span>
            Reading information
          </div>

          <div
            className={
              progress >= 55 ? "done" : progress >= 20 ? "active" : ""
            }
          >
            <span>
              {progress >= 55 ? <Icon name="check" size={12} /> : "2"}
            </span>
            Structuring content
          </div>

          <div
            className={
              progress >= 90 ? "done" : progress >= 55 ? "active" : ""
            }
          >
            <span>
              {progress >= 90 ? <Icon name="check" size={12} /> : "3"}
            </span>
            Formatting report
          </div>
        </div>

        <div className="processing-report">
          <Icon name="file" size={17} />
          <span>{report?.title || "Your event report"}</span>
        </div>
      </div>
    </div>
  );
}

function GeneratedReport({
  report,
  onBack,
  onDashboard,
}) {
  return (
    <div className="page-content inner-page">
      <button className="back-button" onClick={onBack}>
        <Icon name="back" size={17} />
        Back
      </button>

      <div className="generated-heading">
        <div>
          <span className="section-kicker">REPORT READY</span>
          <h1>Your Report Is Ready.</h1>
          <p>
            Review the generated content below before downloading your final
            report.
          </p>
        </div>

        <div className="generated-actions">
          <button
            className="outline-button"
            onClick={() =>
              alert("Edit mode will be connected later.")
            }
          >
            Edit Report
          </button>

          <button
            className="dark-button"
            onClick={() =>
              alert(
                "Download functionality will be connected to the backend."
              )
            }
          >
            <Icon name="download" size={17} />
            Download Report
          </button>
        </div>
      </div>

      <div className="generated-layout">
        <div className="document-preview">
          <div className="document-preview-header">
            <div>
              <span>REPORTFLOW AI</span>
              <strong>FACULTY EVENT REPORT</strong>
            </div>

            <div className="preview-status">
              <Icon name="check" size={13} />
              Completed
            </div>
          </div>

          <div className="document-preview-body">
            <h2>{report?.title || "Faculty Event Report"}</h2>

            <div className="document-meta">
              <span>
                <strong>Department</strong>
                {report?.department || "Computer Science"}
              </span>

              <span>
                <strong>Date</strong>
                {report?.date || "Sep 07, 2026"}
              </span>

              <span>
                <strong>Venue</strong>
                {report?.venue || "Seminar Hall"}
              </span>
            </div>

            <div className="document-content-section">
              <h3>1. Introduction</h3>

              <p>
                The event was organized to provide participants with valuable
                academic and professional exposure. The programme brought
                together faculty members and participants to exchange ideas,
                learn new concepts, and discuss current developments.
              </p>
            </div>

            <div className="document-content-section">
              <h3>2. Event Details</h3>

              <p>
                {report?.description ||
                  "The programme included informative sessions, discussions, presentations, and interactive activities designed to support meaningful learning and collaboration."}
              </p>
            </div>

            {report?.objectives && (
              <div className="document-content-section">
                <h3>3. Objectives</h3>

                <p>{report.objectives}</p>
              </div>
            )}

            <div className="document-content-section">
              <h3>{report?.objectives ? "4. Outcomes" : "3. Outcomes"}</h3>

              <p>
                Participants gained useful knowledge and practical insights.
                The event encouraged interaction, collaboration, and continued
                academic development.
              </p>
            </div>

            <div className="document-signature">
              <div>
                <span>Generated by</span>
                <strong>ReportFlow AI</strong>
              </div>

              <div>
                <span>Document status</span>
                <strong>Ready for submission</strong>
              </div>
            </div>
          </div>
        </div>

        <aside className="report-summary-card panel">
          <span className="section-kicker">SUMMARY</span>
          <h3>Report Details</h3>

          <div className="summary-row">
            <span>Status</span>
            <StatusBadge status="Completed" />
          </div>

          <div className="summary-row">
            <span>Event Type</span>
            <strong>
              {report?.eventType || "Event Report"}
            </strong>
          </div>

          <div className="summary-row">
            <span>Department</span>
            <strong>
              {report?.department || "Computer Science"}
            </strong>
          </div>

          <div className="summary-row">
            <span>Coordinator</span>
            <strong>
              {report?.coordinator || "Not specified"}
            </strong>
          </div>

          <div className="summary-row">
            <span>Organizing Team</span>
            <strong>
              {report?.organizingTeam || "Not specified"}
            </strong>
          </div>

          <div className="summary-row">
            <span>Created</span>
            <strong>Just now</strong>
          </div>

          <div className="summary-row">
            <span>Format</span>
            <strong>Faculty Report</strong>
          </div>

          <div className="summary-row">
            <span>Files</span>
            <strong>
              {report?.files?.length || 0} uploaded
            </strong>
          </div>

          <button
            className="summary-dashboard-button"
            onClick={onDashboard}
          >
            Return to Dashboard
            <Icon name="arrow" size={16} />
          </button>
        </aside>
      </div>
    </div>
  );
}

function ReportsPage({ reports, setPage }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return reports.filter((report) =>
      `${report.title} ${report.department}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [reports, query]);

  return (
    <div className="page-content inner-page">
      <div className="inner-heading reports-heading">
        <div>
          <span className="section-kicker">REPORT LIBRARY</span>
          <h1>My Reports</h1>
          <p>
            All your generated faculty event reports in one place.
          </p>
        </div>

        <button
          className="dark-button"
          onClick={() => setPage("create")}
        >
          <Icon name="plus" size={17} />
          New Report
        </button>
      </div>

      <div className="report-library panel">
        <div className="library-toolbar">
          <div className="library-search">
            <Icon name="search" size={18} />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search reports..."
            />
          </div>

          <span>{filtered.length} reports</span>
        </div>

        <div className="library-list">
          {filtered.map((report) => (
            <div className="library-row" key={report.id}>
              <div className="report-name">
                <div className="report-file-icon">
                  <Icon name="file" size={17} />
                </div>

                <div>
                  <strong>{report.title}</strong>
                  <span>{report.type}</span>
                </div>
              </div>

              <span>{report.department}</span>
              <span>{report.date}</span>

              <StatusBadge status={report.status} />

              <button
                className="view-button"
                onClick={() => setPage("generated")}
              >
                <Icon name="eye" size={16} />
                View
              </button>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="empty-state">
              <Icon name="search" size={26} />
              <h3>No Reports Found</h3>
              <p>
                Try searching with a different title or department.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PlaceholderPage({ type }) {
  const data = {
    templates: {
      kicker: "REPORT TEMPLATES",
      title: "Templates",
      text: "Choose from professional report formats for different academic events.",
      icon: "template",
    },
    analytics: {
      kicker: "INSIGHTS",
      title: "Analytics",
      text: "Track report activity, automation performance, and documentation trends.",
      icon: "analytics",
    },
    settings: {
      kicker: "WORKSPACE",
      title: "Settings",
      text: "Manage your workspace preferences and account configuration.",
      icon: "settings",
    },
  };

  const item = data[type];

  return (
    <div className="page-content placeholder-page">
      <div className="placeholder-card">
        <div className="placeholder-icon">
          <Icon name={item.icon} size={29} />
        </div>

        <span className="section-kicker center">
          {item.kicker}
        </span>

        <h1>{item.title}</h1>

        <p>{item.text}</p>

        <span className="coming-soon">
          More features coming soon
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [reports, setReports] = useState(initialReports);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [processingReport, setProcessingReport] = useState(null);
  const [generatedReport, setGeneratedReport] = useState(null);

  const handleLogin = () => {
    setLoggedIn(true);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setPage("dashboard");
    setMobileOpen(false);
  };

  const handleGenerate = (data) => {
    const newReport = {
      id: Date.now(),
      title: data.title,
      eventType: data.eventType,
      department: data.department,
      date: data.date,
      status: "Processing",
      type: data.eventType || "Event Report",
      venue: data.venue,
      coordinator: data.coordinator,
      organizingTeam: data.organizingTeam,
      description: data.description,
      objectives: data.objectives,
      files: data.files,
    };

    setReports((current) => [newReport, ...current]);
    setProcessingReport(newReport);
    setPage("processing");
  };

  const finishProcessing = () => {
    setReports((current) =>
      current.map((report) =>
        report.id === processingReport?.id
          ? { ...report, status: "Completed" }
          : report
      )
    );

    setGeneratedReport({
      ...processingReport,
      status: "Completed",
    });

    setPage("generated");
  };

  if (!loggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        setPage={setPage}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onLogout={handleLogout}
      />

      <main className="main-area">
        <Header onMenu={() => setMobileOpen(true)} />

        {page === "dashboard" && (
          <Dashboard reports={reports} setPage={setPage} />
        )}

        {page === "create" && (
          <CreateReport
            onBack={() => setPage("dashboard")}
            onGenerate={handleGenerate}
          />
        )}

        {page === "processing" && (
          <Processing
            report={processingReport}
            onComplete={finishProcessing}
          />
        )}

        {page === "generated" && (
          <GeneratedReport
            report={generatedReport || reports[0]}
            onBack={() => setPage("dashboard")}
            onDashboard={() => setPage("dashboard")}
          />
        )}

        {page === "reports" && (
          <ReportsPage
            reports={reports}
            setPage={setPage}
          />
        )}

        {page === "templates" && (
          <PlaceholderPage type="templates" />
        )}

        {page === "analytics" && (
          <PlaceholderPage type="analytics" />
        )}

        {page === "settings" && (
          <PlaceholderPage type="settings" />
        )}
      </main>
    </div>
  );
}