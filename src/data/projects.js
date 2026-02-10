import React from 'react'

export const projects = [
    {
        id: 'medxpert',
        title: 'MedXpert',
        category: 'Medical AI Diagnostic Platform',
        description: 'Deep learning models for brain tumor segmentation (U-Net) and CNN classifiers for skin cancer & chest X-rays. Implemented data augmentation and transfer learning.',
        fullDescription: `
            MedXpert is a comprehensive medical diagnostic platform powered by advanced deep learning models. 
            It is designed to assist healthcare professionals in diagnosing various conditions with high accuracy.
            
            ### Key Features:
            - **Brain Tumor Segmentation**: Utilizes U-Net architecture for precise segmentation of brain tumors from MRI scans.
            - **Skin Cancer Classification**: CNN-based classifier to distinguish between benign and malignant skin lesions.
            - **Chest X-Ray Analysis**: Automated detection of pneumonia and other chest abnormalities.
            - **User-Friendly Interface**: Intuitive web interface for uploading scans and visualizing results.
        `,
        tags: ['Python', 'Deep Learning', 'CNN', 'U-Net', 'Medical Imaging'],
        links: { github: 'https://github.com/mohamed-alawy/medxpert', demo: '#' },
        images: [] // Placeholder for future images
    },
    {
        id: 'yosr',
        title: 'Yosr',
        category: 'AI Accessibility Assistant',
        description: 'Real-time document and currency detection using YOLO with Gemini-based text-to-speech for visually impaired users. Sub-2s latency.',
        fullDescription: `
            Yosr is an innovative mobile application designed to empower visually impaired individuals.
            By leveraging real-time computer vision and generative AI, it provides audible feedback about the user's surroundings.
            
            ### Key Features:
            - **Real-time Detection**: Custom YOLO model for detecting currency and documents instantly.
            - **Text-to-Speech**: Integrated Gemini AI to read detected text and describe scenes naturally.
            - **Currency Recognition**: Identifies various currency denominations to assist in daily transactions.
            - **Low Latency**: Optimized inference pipeline achieving sub-2 second response times on mobile devices.
        `,
        tags: ['YOLO', 'Gemini AI', 'Computer Vision', 'TTS', 'Real-time'],
        links: { github: null, demo: 'https://apps.apple.com/us/app/%D9%8A%D8%B3%D8%B1/id6752940380' },
        demoLabel: 'App Store',
        images: []
    },
    {
        id: 'atlas',
        title: 'Atlas',
        category: 'RAG Backend System',
        description: 'High-performance RAG pipeline using FastAPI & Celery. Features async document processing (chunking -> embedding -> Vector DB), semantic search via PostgreSQL (pgvector), and scalable architecture with RabbitMQ & Redis.',
        fullDescription: `
            Atlas is a robust backend system designed for Retrieval-Augmented Generation (RAG) applications.
            It handles large-scale document processing and semantic search with efficiency and scalability.
            
            ### Architecture:
            - **FastAPI**: High-performance web framework for the API layer.
            - **Celery & RabbitMQ**: Asynchronous task queue for handling heavy document processing jobs without blocking the main thread.
            - **Redis**: Caching layer to speed up frequent queries and manage task states.
            - **PostgreSQL & pgvector**: Vector database for storing embeddings and performing efficient semantic similarity searches.
            
            ### Capabilities:
            - **Document Ingestion**: Supports parsing and chunking of various document formats (PDF, DOCX, TXT).
            - **Embedding Generation**: converting text chunks into vector embeddings using state-of-the-art models.
            - **Context-Aware Retrieval**: Retrieves the most relevant context for LLM queries to reduce hallucinations.
        `,
        tags: ['FastAPI', 'Celery', 'RabbitMQ', 'Redis', 'PostgreSQL', 'Docker'],
        links: { github: 'https://github.com/mohamed-alawy/Atlas', demo: null },
        images: []
    }
]
