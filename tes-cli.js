import inquirer from "inquirer";

let todolist = [];

function menu(){
    inquirer
    .prompt([
        {
        
        type: 'list',
        name: 'pilihan',
        pesan: 'menu pilihan',
        pilihan: ['tambah item', 'lihat list',
            'hapus item', 'keluar'
        ],
        },
    ])
    .then((answers) => {
        switch()
    }
)


}