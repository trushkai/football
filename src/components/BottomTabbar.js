// BottomTabbar.js
import React from 'react';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import { Icon28HomeOutline, Icon28VideoSquareOutline, Icon28UserCircleOutline } from '@vkontakte/icons';

export const BottomTabbar = ({ selectedTab, onTabChange }) => {
  return (
    <Tabbar>
      <TabbarItem
        selected={selectedTab === 'one'}
        onClick={() => onTabChange('one')}
        text="Главная"
        style={{
          color: selectedTab === 'one' ? '#169F43' : '#888', // Цвет текста для активной и неактивной вкладки
        }}
      >
        <Icon28HomeOutline
          style={{
            color: selectedTab === 'one' ? '#169F43' : '#888', // Цвет иконки через currentColor
          }}
        />
      </TabbarItem>
      <TabbarItem
        selected={selectedTab === 'two'}
        onClick={() => onTabChange('two')}
        text="Трансляции"
        style={{
          color: selectedTab === 'two' ? '#169F43' : '#888',
        }}
      >
        <Icon28VideoSquareOutline
          style={{
            color: selectedTab === 'two' ? '#169F43' : '#888', // Цвет иконки через currentColor
          }}
        />
      </TabbarItem>
      <TabbarItem
        selected={selectedTab === 'three'}
        onClick={() => onTabChange('three')}
        text="Профиль"
        style={{
          color: selectedTab === 'three' ? '#169F43' : '#888',
        }}
      >
        <Icon28UserCircleOutline
          style={{
            color: selectedTab === 'three' ? '#169F43' : '#888', // Цвет иконки через currentColor
          }}
        />
      </TabbarItem>
    </Tabbar>
  );
};
