import app = require("teem");

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
