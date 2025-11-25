#!/usr/bin/env python
"""
PokéDex FastAPI Application Launcher

This script starts the FastAPI application with Uvicorn server.
- Host: 0.0.0.0 (accessible from all network interfaces)
- Port: 8000
- Reload: True (auto-reload on code changes during development)
"""
import os
import sys

if __name__ == "__main__":
    # Add the root directory to Python path
    root_dir = os.path.dirname(os.path.abspath(__file__))
    if root_dir not in sys.path:
        sys.path.insert(0, root_dir)
    
    # Change to the project root directory
    os.chdir(root_dir)
    
    # Start the application
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=False
    )
