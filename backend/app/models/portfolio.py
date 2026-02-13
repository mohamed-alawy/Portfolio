from sqlmodel import SQLModel, Field, Column
from typing import Optional, List
from sqlalchemy import Text, JSON

class ExperienceBase(SQLModel):
    title: str
    company: str
    period: str
    description: List[str] = Field(sa_column=Column(JSON))  # Store list of strings as JSON

class Experience(ExperienceBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceRead(ExperienceBase):
    id: int

# ---

class CertificationBase(SQLModel):
    title: str
    issuer: str
    date: str
    link: Optional[str] = None
    description: Optional[str] = None

class Certification(CertificationBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class CertificationCreate(CertificationBase):
    pass

class CertificationRead(CertificationBase):
    id: int

# ---

class AboutBase(SQLModel):
    content: str = Field(sa_column=Column(Text))

class About(AboutBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class AboutCreate(AboutBase):
    pass

class AboutRead(AboutBase):
    id: int

# ---

class ChatbotSettingsBase(SQLModel):
    is_active: bool = Field(default=True)
    inactive_message: str = Field(default="I am currently offline. Please contact me via email.")

class ChatbotSettings(ChatbotSettingsBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class ChatbotSettingsCreate(ChatbotSettingsBase):
    pass

class ChatbotSettingsRead(ChatbotSettingsBase):
    id: int

# ---

class SkillBase(SQLModel):
    name: str
    category: str
    proficiency: Optional[int] = Field(default=None) # 0-100
    icon: Optional[str] = None # Lucide icon name

class Skill(SkillBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class SkillCreate(SkillBase):
    pass

class SkillRead(SkillBase):
    id: int

# ---

class TestimonialBase(SQLModel):
    name: str
    role: str
    content: str = Field(sa_column=Column(Text))
    rating: int = Field(default=5)
    avatar_url: Optional[str] = None
    language: str = Field(default="en") # "en" or "ar"

class Testimonial(TestimonialBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialRead(TestimonialBase):
    id: int

# ---

class ContactInfoBase(SQLModel):
    email: Optional[str] = None
    phone: Optional[str] = None
    github: Optional[str] = None
    linkedin: Optional[str] = None
    twitter: Optional[str] = None
    location: Optional[str] = None

class ContactInfo(ContactInfoBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class ContactInfoCreate(ContactInfoBase):
    pass

class ContactInfoRead(ContactInfoBase):
    id: int

# ---

class CVBase(SQLModel):
    file_url: str
    updated_at: str

class CV(CVBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class CVCreate(CVBase):
    pass

class CVRead(CVBase):
    id: int
