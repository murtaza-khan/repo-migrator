var shell = require('shelljs');

var repos = [
    {
        name: '',
        old: '',
        new: ''
    }
]


for (var repo of repos) {
    shell.exec(`git clone ${repo.old}`, function () {
        shell.cd(`${repo.name}`);
        shell.exec(`git branch -a`, (err, output, error) => {
            console.log('meri output');
            let branches = output.split('remotes/origin/');
            branches.splice(0, 2);

            for (branch of branches) {
                let b = branch.replace("\n  ", "");
                console.log(b);
                shell.exec(`git checkout ${b}`)
            }
            shell.exec(`git branch -a`, function (err, output, error) {
                console.log(output, branches.length);
                shell.exec(`git remote set-url origin ${repo.new}`);
                shell.exec(`git push origin --all`);
                shell.exec(`git push origin --tags`);
            })
        });
    });
}