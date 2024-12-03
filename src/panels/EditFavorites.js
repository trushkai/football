import React, { useState, useEffect } from 'react';
import { Panel, PanelHeader, Group, Cell, Avatar, Div, Button, IconButton } from '@vkontakte/vkui';
import { Icon24Back, Icon24Dismiss } from '@vkontakte/icons';

const allTeams = [
  { id: 1, name: 'Зенит', logo: 'path_to_logo_zenit' },
  { id: 2, name: 'Спартак', logo: 'path_to_logo_spartak' },
  { id: 3, name: 'ЦСКА', logo: 'path_to_logo_cska' },
  { id: 4, name: 'Локомотив', logo: 'path_to_logo_lokomotiv' },
  { id: 5, name: 'Краснодар', logo: 'path_to_logo_krasnodar' },
  { id: 6, name: 'Динамо', logo: 'path_to_logo_dynamo' },
  { id: 7, name: 'Ахмат', logo: 'path_to_logo_ahmat' },
  { id: 8, name: 'Ростов', logo: 'path_to_logo_rostov' },
  { id: 9, name: 'Рубин', logo: 'path_to_logo_rubin' },
  { id: 10, name: 'Сочи', logo: 'path_to_logo_sochi' },
  { id: 11, name: 'Крылья Советов', logo: 'path_to_logo_krylya' },
  { id: 12, name: 'Оренбург', logo: 'path_to_logo_orenburg' },
  { id: 13, name: 'Балтика', logo: 'path_to_logo_baltika' },
  { id: 14, name: 'Химки', logo: 'path_to_logo_khimki' },
  { id: 15, name: 'Урал', logo: 'path_to_logo_ural' },
  { id: 16, name: 'Пари НН', logo: 'path_to_logo_pari_nn' },
];

export const EditFavorites = ({ id, favorites, onBack, onFavoritesChange }) => {
  const [selectedTeams, setSelectedTeams] = useState([...favorites]);

  useEffect(() => {
    setSelectedTeams([...favorites]);
  }, [favorites]);

  const handleTeamClick = (team) => {
    const isSelected = selectedTeams.some((selectedTeam) => selectedTeam.id === team.id);
    if (isSelected) {
      setSelectedTeams(selectedTeams.filter((selectedTeam) => selectedTeam.id !== team.id));
    } else if (selectedTeams.length < 16) {
      setSelectedTeams([...selectedTeams, team]);
    }
  };

  const handleRemoveTeam = (teamId) => {
    setSelectedTeams(selectedTeams.filter((team) => team.id !== teamId));
  };

  const handleSave = () => {
    if (onFavoritesChange) {
      console.log("Saving favorites:", selectedTeams); // Лог для отладки
      onFavoritesChange(selectedTeams); // Передача данных в Home
    }
    if (onBack){
    onBack(); // Возврат к панели Home
    }
  };

  return (
    <Panel id={id}>
      <PanelHeader before={<Icon24Back onClick={onBack} style={{ fill: '#169F43' }}/>}>Редактирование избранных команд</PanelHeader>
      <Group>
        <Div>Выберите свои любимые команды:</Div>
        <div className="team-selection-grid">
          {allTeams.map((team) => (
            <div
              key={team.id}
              className={`team-card ${selectedTeams.some((t) => t.id === team.id) ? 'selected' : ''}`}
              onClick={() => handleTeamClick(team)}
            >
              <Avatar src={team.logo} size={96} className="team-avatar" />
              <span className="team-name">{team.name}</span>
            </div>
          ))}
        </div>
        <Div>Выбранные команды:</Div>
        <div className="selected-teams-list">
          {selectedTeams.map((team) => (
            <Cell
              key={team.id}
              before={<Avatar src={team.logo} size={48} />}
              after={<Icon24Dismiss onClick={() => handleRemoveTeam(team.id)} />}
            >
              {team.name}
            </Cell>
          ))}
        </div>
        <Div>
          <Button onClick={handleSave} size="l">
            Сохранить
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};
