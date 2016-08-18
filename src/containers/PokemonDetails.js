import { List, Map } from 'immutable';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import React, { PropTypes, Component } from 'react';
import * as actions from '../actions';
import clrs from '../utils/clrs';
import Loader from '../components/Loader';
import BasicInfo from '../components/BasicInfo';
import Sprites from '../components/Sprites';
import Moves from '../components/Moves';
import Stats from '../components/Stats';


class PokemonDetails extends Component {
  componentWillMount() {
    this.props.iChooseYou(this.props.url);
  }

  componentWillUnmount() {
    this.props.unChoose();
  }

  render() {

    const { pokemon } = this.props;

    var info, moves, sprites, stats, ready;

    ready = pokemon.get('sprites')?true:false;

    if (ready) {
      /* 提示：請取消註解這一段程式碼 */
      /*
      sprites = <Sprites sprites={ pokemon.get('sprites') } />

      info = <BasicInfo
              types  = { pokemon.get('types') }
              weight = { pokemon.get('weight') }
              height = { pokemon.get('height') } />

      stats = <Stats stats={ pokemon.get('stats') } />

      moves = <Moves moves={ pokemon.get('moves') } />
      */
    }

    return (
      <Loader show={ !ready }>

        {/*
        步驟三、顯示神奇寶貝詳細資料
        */}
        {/* 提示：請刪除下面這一段程式碼 */}
        <View style={ styles.container }>
          <Image source={{ uri: 'http://vignette2.wikia.nocookie.net/againstwar/images/0/0e/1062_body.png/revision/latest?cb=20140510025754&path-prefix=zh' }} style={{ width: 150, height: 150, margin: 15 }} />
          <Text style={{ textAlign: 'center', alignSelf: 'stretch', color: '#ffffff', backgroundColor: '#FF0000' }}>第三關、解鎖神奇寶貝的神秘屬性</Text>
          <Text style={{width: 250, lineHeight: 24, fontSize: 16, color: '#555555' }}>恭喜你已經快要完成練習！請嘗試讓神奇寶貝的各種屬性可以被正確顯示！</Text>
        </View>

        {/* 提示：請取消註解這一段程式碼 */}{/*{/*
        <ScrollView style={ styles.container }>
          { sprites }
          { info }
          { stats }
          { moves }
        </ScrollView>
        */}
      </Loader>
    );
  }
}

PokemonDetails.propTypes = {
  url: PropTypes.string,
  pokemon: PropTypes.instanceOf(Map),
  iChooseYou: PropTypes.func,
  unChoose: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonDetails);

function mapStateToProps(state) {
  return {
    pokemon: state.pokemon.get('active'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    iChooseYou: url => dispatch(actions.iChooseYou(url)),
    unChoose: () => dispatch(actions.unChoose()),
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
