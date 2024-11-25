import React from 'react';
import { Panel, PanelHeader, Group, Div } from '@vkontakte/vkui';
import russianLeagueIcon from '../assets/rpl.png';
import uefaLeagueIcon from '../assets/uefa.png';
import englishLeagueIcon from '../assets/apl.png';
import main1 from '../assets/main1.png';
import main2 from '../assets/main2.png';
import main3 from '../assets/main3.png';
import { LeagueCard } from '../components/LeagueCard';

export const MainPage = ({ id, onLeagueClick }) => {
  return (
    <Panel id={id}>
      {/* Добавляем PanelHeader */}
      <PanelHeader>Болельщик</PanelHeader>

      {/* Приветственное сообщение */}
      <Group>
        <Div className="greeting-container">
          <h2 className="greeting-title">Привет, болельщик!</h2>
          <p className="greeting-subtitle">Выбери одну из лиг, чтобы посмотреть матчи</p>
        </Div>

        {/* Карточки лиг */}
        <Div className="ligi">
          <LeagueCard
            title="Российская Премьер-Лига"
            icon={russianLeagueIcon}
            background={main1}
            onClick={onLeagueClick} // Передаём обработчик
          />
          <LeagueCard
            title="Лига чемпионов УЕФА"
            icon={uefaLeagueIcon}
            background={main2}
          />
          <LeagueCard
            title="Английская Премьер-Лига"
            icon={englishLeagueIcon}
            background={main3}
          />
        </Div>
      </Group>
    </Panel>
  );
};
