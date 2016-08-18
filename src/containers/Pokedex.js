import {
  StyleSheet,
  View,
  Text,
  Image,
  ListView,
  Platform,
} from 'react-native';
import Immutable, { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import SearchBar from '../components/SearchBar';
import MediaObject from '../components/MediaObject';
import Loader from '../components/Loader';
import clrs from '../utils/clrs';
import * as actions from '../actions';
import { filteredPokemon } from '../selectors';

const Spacer = Platform.OS === 'ios' ? <KeyboardSpacer /> : null;


class Pokedex extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !Immutable.is(r1, r2),
    });

    this.state = { pokemon: dataSource };
  }

  componentWillReceiveProps({ pokemon }) {
    this.setState({
      pokemon: this.state.pokemon.cloneWithRows(pokemon.toArray()),
    });
  }

  render() {
    const { pokemon } = this.state;
    const { goToPokemonDetail, filter, query, ready } = this.props;

    var level1pass = true;

    return (
      <Loader show={ !ready }>
        <View style={ styles.container }>

          {/*
          步驟一、在畫面上顯示皮卡丘和 Hello, Pokemon 文字訊息
          */}
          {/* 提示：請刪除這一行程式碼 */}<Image source={require('../assets/who.jpg')} style={{ marginTop: 50, width: 100, height: 100 }} />{ level1pass = false }<Text style={{ textAlign: 'center', alignSelf: 'stretch', color: '#ffffff', backgroundColor: '#FF0000' }}>第一關、解鎖消失的皮卡丘</Text>

          {/* 提示：請取消註解這一段程式碼 */}{/*
          <Image source={{ uri: 'http://vignette2.wikia.nocookie.net/pokemon/images/e/ef/025Pikachu_Pokemon_Mystery_Dungeon_Red_and_Blue_Rescue_Teams.png/revision/latest?cb=20150105233050' }} style={ styles.headingImage } />
          <Text style={ styles.headingText }>Hello, Pokemon</Text>
          */}

          <ListView dataSource={ pokemon }
            style={ styles.listView }
            renderRow={ (...args) => renderRow(goToPokemonDetail, ...args) }
            enableEmptySections />

          {/*
          步驟二、在畫面上顯示皮卡丘和 Hello, Pokemon 文字訊息
          */}
          {/* 提示：請刪除這一行程式碼 */}<Text style={{ textAlign: 'center', alignSelf: 'stretch', color: '#ffffff', backgroundColor: '#FF0000', opacity: level1pass?1:0 }}>第二關、解鎖快速搜尋列</Text>

          {/* 提示：請取消註解這一段程式碼 */}{/*
          <SearchBar onChange={ filter } value={ query } />
          */}

          { Spacer }

        </View>
      </Loader>
    );
  }
}

Pokedex.propTypes = {
  goToPokemonDetail: PropTypes.func,
  filter: PropTypes.func,
  pokemon: PropTypes.instanceOf(List),
  query: PropTypes.string,
  ready: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: clrs.white,
  },
  listView: {
    flex: 1,
    alignSelf: 'stretch',
  },
  headingImage: {
    /* 提示：請取消註解這一段程式碼 */
    /*
    width: 120,
    height: 120,
    margin: 5,
    */
  },
  headingText: {
    /* 提示：請取消註解這一段程式碼 */
    /*
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'stretch',
    padding: 5,
    color: '#FFFFFF',
    backgroundColor: '#3269b2',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    textShadowColor: '#00cccc',
    */
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pokedex);

function mapStateToProps(state) {
  return {
    pokemon: filteredPokemon(state),
    query: state.pokemon.get('query'),
    ready: state.pokemon.get('ready'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    filter: query => dispatch(actions.filter(query)),
    goToPokemonDetail: pokemon => {
      dispatch(actions.goToPokemonDetail(pokemon));
    },
  };
}

function renderRow(goTo, pokemon, sId, id) {
  const POKEMON_STATE = {
    title: pokemon.get('name'),
    url: pokemon.get('url'),
  };

  const re = /^.*pokemon\/(.+)\/$/;
  const matches = re.exec(pokemon.get('url'));
  const pokemonID = matches ? matches[1] : null;
  const imageUrl = (
    pokemonID ? `http://pokeapi.co/media/sprites/pokemon/${ pokemonID }.png` :
                null
  );

  return (
    <MediaObject index={ id }
      text={ pokemon.get('name') }
      imageUrl={ imageUrl }
      action={ () => goTo(POKEMON_STATE) } />
  );
}
