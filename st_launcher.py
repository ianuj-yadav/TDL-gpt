"""
Launcher for the TDL Enterprise AI Studio Streamlit Web Application.

Note: To prevent Python module shadowing ('-m streamlit' running this file instead 
of the installed package), this script invokes the actual 'streamlit.exe' binary!
"""
import sys
import os
import subprocess

def main():
    print("[INFO] Starting TDL Enterprise AI Studio in your web browser...")
    app_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "streamlit_app.py")
    
    # Locate the real streamlit.exe inside the virtual environment
    venv_dir = os.path.dirname(sys.executable)
    streamlit_exe = os.path.join(venv_dir, "streamlit.exe" if os.name == "nt" else "streamlit")
    
    if os.path.exists(streamlit_exe):
        cmd = [streamlit_exe, "run", app_path, "--server.port", "8505"]
    else:
        # Fallback if streamlit.exe is not in same folder as python.exe
        cmd = ["streamlit", "run", app_path, "--server.port", "8505"]
        
    try:
        subprocess.run(cmd)
    except KeyboardInterrupt:
        print("\n[INFO] Server stopped by user.")
    except Exception as e:
        print(f"[ERROR] Failed to start server: {e}")
        print(f"Please run manually: streamlit run {app_path}")

if __name__ == "__main__":
    main()
