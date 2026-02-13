from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.project import Project
from app.models.portfolio import (
    Experience, Certification, About, Skill,
    Experience, Certification, About, Skill,
    ContactInfo, CV, Testimonial
)


SEED_PROJECTS = [
    {
        "title": "MedXpert",
        "category": "Medical AI Diagnostic Platform",
        "description": "Deep learning models for brain tumor segmentation (U-Net) and CNN classifiers for skin cancer & chest X-rays. Implemented data augmentation and transfer learning.",
        "full_description": """MedXpert is a comprehensive medical diagnostic platform powered by advanced deep learning models. 
It is designed to assist healthcare professionals in diagnosing various conditions with high accuracy.

### Key Features:
- **Brain Tumor Segmentation**: Utilizes U-Net architecture for precise segmentation of brain tumors from MRI scans.
- **Skin Cancer Classification**: CNN-based classifier to distinguish between benign and malignant skin lesions.
- **Chest X-Ray Analysis**: Automated detection of pneumonia and other chest abnormalities.
- **User-Friendly Interface**: Intuitive web interface for uploading scans and visualizing results.""",
        "tags": ["Python", "Deep Learning", "CNN", "U-Net", "Medical Imaging"],
        "github_link": "https://github.com/mohamed-alawy/medxpert",
        "demo_link": "#",
        "demo_label": None,
        "image_urls": [
            "/api/v1/uploads/2.png",
            "/api/v1/uploads/3.png",
            "/api/v1/uploads/4.png",
            "/api/v1/uploads/6.png",
            "/api/v1/uploads/7.png",
            "/api/v1/uploads/8.png",
            "/api/v1/uploads/9.png",
            "/api/v1/uploads/11.png",
            "/api/v1/uploads/image_original.png",
        ],
    },
    {
        "title": "Yosr",
        "category": "AI Accessibility Assistant",
        "description": "Real-time form detection and filling assistant for visually impaired users. Features on-device ONNX models for detection & orientation, with a robust backend for processing, validation, and smart field mapping using Gemini & Gemini Nano.",
        "full_description": """Yosr is an advanced accessibility application designed to help visually impaired individuals interact with physical forms independently.
The system employs a hybrid architecture, combining fast on-device models for real-time guidance with powerful backend models for precise processing.

### Technical Workflow:
- **On-Device Real-time Analysis**: 
    - Uses **two ONNX models** running locally on the app.
    - **Model 1**: Detects forms in real-time.
    - **Model 2**: Specific model to determine the orientation of the document.

- **Backend Processing Pipeline**:
    - **Advanced Cropping**: A specialized model precisely segments the form from the background.
    - **Common Form Model**: A dedicated model identifies field locations and targets the signature area.
    - **Gemini Validation & OCR**: The image is sent to Gemini for validation and text extraction.
    - **Smart Field Mapping**: Gemini extracts field names; Gemini Nano maps user input data to fields.""",
        "tags": ["FastAPI", "Celery", "Redis", "PostgreSQL", "Docker", "ONNX", "YOLO", "Gemini Nano", "Computer Vision"],
        "github_link": None,
        "demo_link": "https://apps.apple.com/us/app/%D9%8A%D8%B3%D8%B1/id6752940380",
        "demo_label": "App Store",
        "image_urls": [
            "/api/v1/uploads/screen1.jpeg",
            "/api/v1/uploads/screen2.jpeg",
            "/api/v1/uploads/scanner.jpeg",
            "/api/v1/uploads/screen3.jpeg",
            "/api/v1/uploads/screen4.jpeg",
            "/api/v1/uploads/screen5.jpeg",
            "/api/v1/uploads/form.jpeg",
            "/api/v1/uploads/final_form.jpeg",
        ],
    },
    {
        "title": "Atlas",
        "category": "RAG Backend System",
        "description": "High-performance RAG pipeline using FastAPI & Celery. Features async document processing (chunking -> embedding -> Vector DB), semantic search via PostgreSQL (pgvector), and scalable architecture with RabbitMQ & Redis.",
        "full_description": """Atlas is a robust backend system designed for Retrieval-Augmented Generation (RAG) applications.
It handles large-scale document processing and semantic search with efficiency and scalability.

### Architecture:
- **FastAPI**: High-performance web framework for the API layer.
- **Celery & RabbitMQ**: Asynchronous task queue for handling heavy document processing jobs.
- **Redis**: Caching layer to speed up frequent queries and manage task states.
- **PostgreSQL & pgvector**: Vector database for storing embeddings and performing semantic similarity searches.

### Capabilities:
- **Document Ingestion**: Supports parsing and chunking of various document formats (PDF, DOCX, TXT).
- **Embedding Generation**: Converting text chunks into vector embeddings using state-of-the-art models.
- **Context-Aware Retrieval**: Retrieves the most relevant context for LLM queries to reduce hallucinations.""",
        "tags": ["FastAPI", "Celery", "RabbitMQ", "Redis", "PostgreSQL", "Docker"],
        "github_link": "https://github.com/mohamed-alawy/Atlas",
        "demo_link": None,
        "demo_label": None,
        "image_urls": [],
    },
]

SEED_EXPERIENCE = [
    {
        "title": "AI Accessibility Assistant Developer",
        "company": "Yosr (Freelance)",
        "period": "2025 - 2026",
        "description": [
            "Built a custom YOLO model for real-time document and currency detection.",
            "Integrated Gemini-based AI for contextual understanding and text-to-speech feedback.",
            "Optimized the AI inference pipeline to achieve sub-2s real-time response."
        ]
    },
    {
        "title": "Freelancing Trainee",
        "company": "ITIDA Gigs / EYouth",
        "period": "Jun - Sep 2025",
        "description": [
            "Mastered freelancing essentials: profile setup, proposals, portfolio, and financial management.",
            "Enhanced communication and negotiation skills through expert sessions.",
            "Successfully obtained first freelance project during training."
        ]
    },
    {
        "title": "AI Trainee",
        "company": "National Telecommunication Institute (NTI)",
        "period": "Aug 2025",
        "description": [
            "Mastered core ML and AI concepts using Python.",
            "Developed and trained ML models for classification and prediction.",
            "Gained hands-on experience in Computer Vision and introductory NLP."
        ]
    }
]

SEED_CERTIFICATIONS = [
    {
        "title": "ITIDA Gigs Freelancing Program (AI & Freelancing Skills)",
        "issuer": "ITIDA & EYouth",
        "date": "Jun 2025 - Sep 2025",
        "link": "https://media.licdn.com/dms/document/media/v2/D4E1FAQFsYjFFCVITbw/feedshare-document-sanitized-pdf/B4EZlo62TjKgA8-/0/1758401885950?e=1771369200&v=beta&t=hVfNXPy3JOYwGOM_cLlECqEg70slH55k93M1azk_NPM",
        "description": "Completed an intensive 3-month program covering freelancing essentials: profile setup, proposals, portfolio creation, and financial management. Successfully launched freelance career and obtained first gig."
    },
    {
        "title": "AI Intern",
        "issuer": "National Telecommunication Institute (NTI)",
        "date": "Aug 2025 (1 mo)",
        "link": "https://media.licdn.com/dms/document/media/v2/D4E1FAQEERhbjpmEdow/feedshare-document-sanitized-pdf/B4EZjH3.z6GYBA-/0/1755700001402?e=1771369200&v=beta&t=oYGRvL5sWH6QYGd_Uh91GjIQxqFhWASmUKfc3ZegtBM",
        "description": "Completed an intensive AI training program, mastering core concepts of Artificial Intelligence, Machine Learning, Computer Vision, and NLP using Python. Developed classification and prediction models with real-world datasets."
    }
]

SEED_CONTACT_INFO = {
    "email": "mohamed.alawy.21@gmail.com",
    "phone": "+201009283969",
    "github": "https://github.com/mohamed-alawy",
    "linkedin": "https://www.linkedin.com/in/mohamed-alawy/",
    "twitter": None,
    "location": "Egypt"
}

SEED_CV = {
    "file_url": "https://drive.google.com/file/d/1RLbofdD-xzom2KSFTjKeGq6ztNg6u85A/view?usp=drive_link",
    "updated_at": "Updated August 2025"
}

SEED_TESTIMONIALS = [
    {
        "name": "Sarah Jenkins",
        "role": "Product Manager @ TechFlow",
        "content": "Mohamed delivered an exceptional Computer Vision model for our quality control system. His attention to detail and optimization for edge devices was impressive. Highly recommended!",
        "rating": 5,
        "language": "en",
        "link": "https://www.linkedin.com/"
    },
    {
        "name": "Ahmed Salem",
        "role": "Startup Founder",
        "content": "سعدت جداً بالتعامل مع البشمهندس محمد. قام ببناء نظام RAG كامل بشكل احترافي وسريع. فهمه للمتطلبات كان ممتازاً والتواصل كان سلساً جداً.",
        "rating": 5,
        "language": "ar",
        "link": None
    },
    {
        "name": "David Chen",
        "role": "CTO @ DataSphere",
        "content": "One of the best AI freelancers I've worked with. He solved a complex NLP problem that our internal team was struggling with for weeks.",
        "rating": 5,
        "language": "en",
        "link": "https://www.upwork.com/"
    }
]

SEED_ABOUT_CONTENT = """I’m Mohamed Usama, an AI freelancer with over 7 years of freelance experience and 2+ years solving real-world AI problems.
I love turning challenging tasks into smart, practical solutions, whether it’s **Computer Vision, NLP, RAG, or AI agents**.

New challenges excite me - they push me to research, experiment, and deliver results that really work."""


SEED_SKILLS = [
    {"name": "Python", "category": "Programming", "icon": "Code", "proficiency": 95},
    {"name": "C++", "category": "Programming", "icon": "Code", "proficiency": 80},
    {"name": "SQL", "category": "Programming", "icon": "Database", "proficiency": 85},
    
    {"name": "TensorFlow", "category": "Machine Learning", "icon": "Cpu", "proficiency": 90},
    {"name": "PyTorch", "category": "Machine Learning", "icon": "Cpu", "proficiency": 85},
    {"name": "Scikit-learn", "category": "Machine Learning", "icon": "Cpu", "proficiency": 80},
    {"name": "CNNs", "category": "Machine Learning", "icon": "Cpu", "proficiency": 80},
    {"name": "Transfer Learning", "category": "Machine Learning", "icon": "Cpu", "proficiency": 80},

    {"name": "OpenCV", "category": "Computer Vision", "icon": "Eye", "proficiency": 90},
    {"name": "YOLO", "category": "Computer Vision", "icon": "Eye", "proficiency": 95},
    {"name": "MediaPipe", "category": "Computer Vision", "icon": "Eye", "proficiency": 85},
    {"name": "Object Detection", "category": "Computer Vision", "icon": "Eye", "proficiency": 90},
    {"name": "Segmentation", "category": "Computer Vision", "icon": "Eye", "proficiency": 85},

    {"name": "Google Gemini", "category": "AI & NLP", "icon": "Brain", "proficiency": 85},
    {"name": "GPT APIs", "category": "AI & NLP", "icon": "Brain", "proficiency": 90},
    {"name": "RAG", "category": "AI & NLP", "icon": "Brain", "proficiency": 80},
    {"name": "OCR", "category": "AI & NLP", "icon": "Brain", "proficiency": 85},
    {"name": "Text Analysis", "category": "AI & NLP", "icon": "Brain", "proficiency": 80},

    {"name": "FastAPI", "category": "Backend & Tools", "icon": "Cloud", "proficiency": 90},
    {"name": "Flask", "category": "Backend & Tools", "icon": "Cloud", "proficiency": 85},
    {"name": "Docker", "category": "Backend & Tools", "icon": "Cloud", "proficiency": 80},
    {"name": "Git", "category": "Backend & Tools", "icon": "Terminal", "proficiency": 90},
]


async def seed_projects(session: AsyncSession):
    """Seed the database with initial portfolio data if empty."""
    
    # Check if About exists to determine if we should print "Already initialized" messages
    # But we still run checks per table to allow adding NEW features (like Testimonials) to existing deployments
    about_exists = await session.execute(select(About))
    is_initialized = bool(about_exists.scalars().first())

    # Seed Projects
    result = await session.execute(select(Project))
    if len(result.scalars().all()) == 0:
        for p in SEED_PROJECTS:
            session.add(Project(**p))
        print(f"Seeded {len(SEED_PROJECTS)} projects.")

    # Seed Experience
    result = await session.execute(select(Experience))
    if len(result.scalars().all()) == 0:
        for e in SEED_EXPERIENCE:
            session.add(Experience(**e))
        print(f"Seeded {len(SEED_EXPERIENCE)} experiences.")

    # Seed Certifications
    result = await session.execute(select(Certification))
    if len(result.scalars().all()) == 0:
        for c in SEED_CERTIFICATIONS:
            session.add(Certification(**c))
        print(f"Seeded {len(SEED_CERTIFICATIONS)} certifications.")

    # Seed About
    if not is_initialized:
        session.add(About(content=SEED_ABOUT_CONTENT))
        print("Seeded About content.")

    # Seed Skills
    result = await session.execute(select(Skill))
    if len(result.scalars().all()) == 0:
        for s in SEED_SKILLS:
            session.add(Skill(**s))
        print(f"Seeded {len(SEED_SKILLS)} skills.")

    # Seed Testimonials
    result = await session.execute(select(Testimonial))
    if len(result.scalars().all()) == 0:
        for t in SEED_TESTIMONIALS:
            session.add(Testimonial(**t))
        print(f"Seeded {len(SEED_TESTIMONIALS)} testimonials.")

    # Seed Contact Info
    result = await session.execute(select(ContactInfo))
    if not result.scalars().first():
        session.add(ContactInfo(**SEED_CONTACT_INFO))
        print("Seeded Contact Info.")

    # Seed CV
    result = await session.execute(select(CV))
    if not result.scalars().first():
        session.add(CV(**SEED_CV))
        print("Seeded CV details.")

    await session.commit()
