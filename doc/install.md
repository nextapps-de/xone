# Xone Installation (recommended)
```bash
> npm install -g xone
```
__Note:__ To make the _Xone CLI_ globally available, you have to install Xone as a global npm module (also in addition to any local installation if you want to keep simple as most as possible). You can also manage multiple/custom versions of Xone as well as using the CLI without any global installations (read further).

__Note:__ Xone binaries typically has to be installed via "xone create" or "xone install" to make full advantage of the build system and also comes with its own pre-defined folder structure (followed by some conventions). We will provide a stand-alone version optionally to skip as many conventions as possible (e.g. Xone acts like an extern Javascript Plugin). We recommended to use the full Xone build capabilities (read further).

---

### Create new Xone project
Create a new project inside the directory _workspace\my_project_:
```bash
workspace> xone create "my_project"
```

Create a new project inside the _current_ directory:
```bash
workspace\my_project> xone create .
```

Force overwrite an existing Xone project:
```bash
workspace\my_project> xone create . --force
```
__Note:__ Be careful, this command will also reset most of the existing project files!

---

### Update existing Xone project (fetches from _global npm_modules_ installation)
Fetch update:
```bash
> npm install -g xone
```

Install update to an existing project
```bash
workspace\my_project> xone install
```

---

### Manage multiple versions
Install local version of xone:
```bash
> npm install xone@0.2.1
```

Compare current installed, local and global npm versions of Xone:
```bash
> xone version --current
```
```bash
> xone version --global
```
```bash
> xone version --local
```

Update Xone binaries of an existing Xone project (fetch from a _local npm_modules_ installation):
```bash
workspace\my_project> xone install local
```

Update Xone binaries of an existing Xone project (fetch from any _custom_ location):
```bash
workspace\my_project> xone install /lib/xone_0.2.1/
```

__Note:__ To make the _Xone CLI_ available (use the keyword 'xone') it needs at least one global Xone installation. Please read further if you prefer an installation without using the _Xone CLI_.

---

### Manage local npm repositories of Xone (without using _Xone CLI_):
Install Xone locally:
```bash
workspace\my_project> npm install xone
```

Create new Xone project (the dot indicates the current directory):
```bash
workspace\my_project> node node_modules\xone\create .
```

Update existing Xone project:
```bash
workspace\my_project> node node_modules\xone\install
```

### Alternatively you can use a Xone repository located in any folder (e.g. fetched via Git)
Check Xone installation (example):
```bash
lib\xone_0.2.1> node version
```

Create a new project:
```bash
workspace> node ../lib/xone_0.2.1/create "my_project"
```

Update an existing project:
```bash
workspace\my_project> node ../lib/xone_0.2.1/install
```
