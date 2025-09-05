import os

def create_ghibli_portfolio_structure(base_dir='.'):  # Changed to current directory
    structure = {
        'frontend': {
            'public': ['index.html', 'favicon.ico'],
            'src': {
                'components': ['Mountain3D.js', 'Checkpoint.js', 'FloatingClouds.js', 'ParticleSystem.js'],
                'styles': ['GlobalStyles.js', 'theme.js'],
                'data': ['resumeData.js'],
                'App.js': None,
                'index.js': None,
                'package.json': None
            }
        },
        'backend': {
            'routes': ['contact.js'],
            'server.js': None,
            'package.json': None
        },
        'README.md': None
    }

    def make_dirs(base, tree):
        for key, value in tree.items():
            curr_path = os.path.join(base, key)
            if value is None:
                # it's a file, create it
                with open(curr_path, 'w', encoding='utf-8') as f:  # Added UTF-8 encoding
                    f.write('')
            elif isinstance(value, dict):
                os.makedirs(curr_path, exist_ok=True)
                make_dirs(curr_path, value)
            elif isinstance(value, list):
                os.makedirs(curr_path, exist_ok=True)
                for item in value:
                    file_path = os.path.join(curr_path, item)
                    with open(file_path, 'w', encoding='utf-8') as f:  # Added UTF-8 encoding
                        f.write('')

    base = base_dir
    os.makedirs(base, exist_ok=True)
    make_dirs(base, structure)

if __name__ == '__main__':
    create_ghibli_portfolio_structure()
