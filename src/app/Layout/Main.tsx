import React from 'react';
import DropdownCombo from '../components/Dropdown/Dropdown';
import MetricCard from '../components/Indicators/MetricCard';
import { FaBicycle, FaGlobeAmericas, FaHeartbeat, FaHome, FaMoneyBillWave, FaQuestion, FaUserGraduate, FaShieldAlt } from 'react-icons/fa';

import data from '../dados.json';

const Main = () => {


  return (
    <main>


      <div className="container-fluid text-center align-items-center" style={{ paddingTop: '40px' }}>
        <header>

          <DropdownCombo />

          <br />
        </header>
        <hr />

        <div id="eixos" className="row g-2 text-center align-items-center">
          <div className="col">
            <button type="button" className="btn btn-primary active col-12 d-flex flex-sm-column" style={{ backgroundColor: 'LightCoral' }} data-id="1" data-toggle="button" aria-pressed="true" >
              <FaHeartbeat /> Saúde
            </button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-primary col-12 d-flex flex-sm-column" style={{ backgroundColor: 'LightSkyBlue' }} data-id="2" data-toggle="button" aria-pressed="false" >
              <FaUserGraduate /> Educação
            </button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-primary col-12 d-flex flex-sm-column" style={{ backgroundColor: 'MediumSlateBlue' }} data-i="3" data-toggle="button" aria-pressed="false" >
              <FaHome /> Assistência social
            </button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-primary col-12 d-flex flex-sm-column" style={{ backgroundColor: 'orange' }} data-id="4" data-toggle="button" aria-pressed="false" ><FaShieldAlt /> Segurança
            </button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-primary col-12" style={{ backgroundColor: 'YellowGreen' }} data-id="5" data-toggle="button" aria-pressed="false" ><FaGlobeAmericas /> Meio ambiente
              <br /><FaBicycle /> Urbanização & Mobilidade
            </button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-primary col-12 d-flex flex-sm-column" style={{ backgroundColor: 'DarkKhaki' }} data-id="6" data-toggle="button" aria-pressed="false" ><FaMoneyBillWave /> Economia & Finanças
            </button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-primary col-12 d-flex flex-sm-column" style={{ backgroundColor: 'DimGrey' }} data-id="7" data-toggle="button" aria-pressed="false" ><FaQuestion /> Personalizado
            </button>
          </div>
        </div>


        {data.map((dado: any, i: number) => {
          return <MetricCard key={i} props={dado} />
        })}

        <footer><hr />footer</footer>

      </div>
    </main>

  );
};

export default Main;
