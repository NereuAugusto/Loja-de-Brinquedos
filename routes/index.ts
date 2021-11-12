﻿import app = require("teem");

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		let lista: any[];

		await app.sql.connect(async (sql) => {
			lista = await sql.query("select id, nome, descricao, preco from produto order by preco asc limit 12");
		});

		let opcoes = {
			produtos: lista
		};

		res.render("index/index", opcoes);
	}

	public async cadastro(req: app.Request, res: app.Response) {
		res.render("index/cadastro");
	}

	@app.http.post()
	public async criarProduto(req: app.Request, res: app.Response) {
		// Os dados enviados via POST ficam dentro de req.body
		let produto = req.body;

		// É sempre muito importante validar os dados do lado do servidor,
		// mesmo que eles tenham sido validados do lado do cliente!!!
		if (!produto) {
			res.status(400);
			res.json("Dados inválidos");
			return;
		}

		if (!produto.nome) {
			res.status(400);
			res.json("Nome inválido");
			return;
		}

		if (!produto.descricao) {
			res.status(400);
			res.json("Descriçao inválida");
			return;
		}

		produto.preco = parseFloat(produto.preco);
		if (isNaN(produto.preco) || produto.preco <= 0) {
			res.status(400);
			res.json("Preço inválido");
			return;
		}

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().

			// As interrogações serão substituídas pelos valores passados ao final, na ordem passada.
			await sql.query("INSERT INTO produto (nome, descricao, preco) VALUES (?, ?, ?)", [produto.nome, produto.descricao, produto.preco]);

		});

		res.json(true);
	}

	public async produtos(req: app.Request, res: app.Response) {
		let lista: any[];

		await app.sql.connect(async (sql) => {
			lista = await sql.query("select id, nome, descricao, preco from produto order by preco asc");
		});

		let opcoes = {
			produtos: lista
		};

		res.render("index/produtos", opcoes);
	}
}

export = IndexRoute;
