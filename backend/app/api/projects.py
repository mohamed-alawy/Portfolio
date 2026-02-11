from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from typing import List

from app.core.db import get_session
from app.models.project import Project, ProjectCreate, ProjectRead

router = APIRouter()


@router.get("/", response_model=List[ProjectRead])
async def get_projects(session: AsyncSession = Depends(get_session)):
    """Get all projects."""
    result = await session.execute(select(Project))
    projects = result.scalars().all()
    return projects


@router.get("/{project_id}", response_model=ProjectRead)
async def get_project(project_id: int, session: AsyncSession = Depends(get_session)):
    """Get a single project by ID."""
    project = await session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.post("/", response_model=ProjectRead, status_code=201)
async def create_project(project: ProjectCreate, session: AsyncSession = Depends(get_session)):
    """Create a new project."""
    db_project = Project.model_validate(project)
    session.add(db_project)
    await session.commit()
    await session.refresh(db_project)
    return db_project


@router.put("/{project_id}", response_model=ProjectRead)
async def update_project(project_id: int, project_data: ProjectCreate, session: AsyncSession = Depends(get_session)):
    """Update an existing project."""
    project = await session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    project_dict = project_data.model_dump()
    for key, value in project_dict.items():
        setattr(project, key, value)
    
    session.add(project)
    await session.commit()
    await session.refresh(project)
    return project


@router.delete("/{project_id}")
async def delete_project(project_id: int, session: AsyncSession = Depends(get_session)):
    """Delete a project."""
    project = await session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    await session.delete(project)
    await session.commit()
    return {"message": "Project deleted successfully"}
