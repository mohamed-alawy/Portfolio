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
