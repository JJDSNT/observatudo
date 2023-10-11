import "reflect-metadata"
import { StorageService } from '@/app/services/storageService';
//import DB from '../database/config/ormconfig_seminit'
import { Localidade } from "../models/Localidade";
import { Pais } from "@/app/models/Pais";
import { Estado } from "../models/Estado";
import { Cidade } from "../models/Cidade";
import { Indicador } from "../models/Indicador";
import { Fonte } from "@/app/models/Fonte"
import { Eixo, Eixos } from "../models/Eixo";
import { ValorIndicador } from "../models/ValorIndicador";

/*
export class CreateDataController {

  public async createData() {



      // Criar eixos
      const eixos = [
        { nome: Eixos.Saude, icon: 'FaHeartbeat', cor: 'bg-red-500' },
        { nome: Eixos.Educacao, icon: 'FaUserGraduate', cor: 'bg-blue-500' },
        { nome: Eixos.AssistenciaSocial, icon: 'FaHome', cor: 'bg-purple-500' },
        { nome: Eixos.Seguranca, icon: 'FaShieldAlt', cor: 'bg-yellow-500' },
        { nome: Eixos.MeioAmbiente, icon: 'FaGlobeAmericas', cor: 'bg-green-500' },
        { nome: Eixos.EconomiaFinancas, icon: 'FaMoneyBillWave', cor: 'bg-indigo-500' },
        { nome: Eixos.Personalizado, icon: 'FaQuestion', cor: 'bg-gray-500' }
      ];


      const eixosCriados = [];

      for (const eixoData of eixos) {
        const eixo = new Eixo();
        eixo.nome = eixoData.nome;
        eixo.icon = eixoData.icon;
        eixo.cor = eixoData.cor;

        await DB.manager.save(eixo);
        eixosCriados.push(eixo);
      }


      // Criar fontes
      const fonte1 = new Fonte();
      fonte1.nome = "Fonte 1";
      fonte1.url = "https://www.fonte1.com";

      const fonte2 = new Fonte();
      fonte2.nome = "Fonte 2";
      fonte2.url = "https://www.fonte2.com";

      // Salvar fontes no banco de dados
      await DB.manager.save(fonte1);
      await DB.manager.save(fonte2);

      // Criar indicadores

      const indicador1 = new Indicador(
        "indicador1",
        "Cobertura vacinal",
        "Esse indicador avalia a proporção de crianças e adultos que receberam as vacinas recomendadas pelas autoridades de saúde.",
        fonte1, [eixosCriados[0]]
      );


      const indicador2 = new Indicador(
        "indicador2",
        "Índice de pobreza",
        "Esse indicador mede a proporção de pessoas que vivem abaixo da linha de pobreza em uma cidade.",
        fonte1, [eixosCriados[0]]
      );

      const indicador3 = new Indicador(
        "indicador3",
        "Taxa de conclusão do ensino médio",
        "Esse indicador mede a proporção de jovens que concluem o ensino médio em relação à população em idade escolar adequada para esse nível de ensino",
        fonte2, [eixosCriados[1]]
      );

      const indicador4 = new Indicador(
        "indicador4",
        "Capacidade de pagamento",
        "Esse indicador mede a capacidade de pagamento",
        fonte1, [eixosCriados[5]]
      );


      // Salvar indicadores no banco de dados
      await DB.manager.save([indicador1, indicador2, indicador3, indicador4]);

      //const valorRepository = DB.manager.getRepository(ValorIndicador);
      // Criar valores de indicador para as localidades
      const localidades = [cidade1, cidade2, cidade3, cidade4, cidade5, cidade6];
      const valoresIndicador: ValorIndicador[] = [];

      let currentDate = new Date(); // Start with the current date

      for (const localidade of localidades) {
        for (let i = 1; i <= 4; i++) {
          const indicador = i === 1 ? indicador1 : i === 2 ? indicador2 : i === 3 ? indicador3 : indicador4;
          for (let j = 0; j < 2; j++) {
            const valor = new ValorIndicador();
            valor.indicador = indicador;
            valor.localidade = localidade;
            valor.valor = +(Math.random() * 100).toFixed(2); // Valor aleatório entre 0 e 100
            valor.data = new Date(currentDate); // Assign a new instance of Date
            currentDate.setMonth(currentDate.getMonth() + i+j); // Increment the month by 1
            valoresIndicador.push(valor);
          }
        }
      }


      console.log(valoresIndicador);

      // Salvar valores de indicador no banco de dados
      await DB.manager.save(valoresIndicador);
      console.log('dados criados');
      return "Dados criados com sucesso!";




    })
      .catch((err) => {
        console.log(err);
        return err;
      })
    //.catch(error => console.log(error))
    console.log('TESTANDO');
    return 'testando';

  }
}
*/