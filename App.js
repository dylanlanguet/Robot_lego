/* Banette Théo
App.js
@version: 1.0
date: 20/05/2020
*/
// Importation des modules
import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button} from 'react-native';
// Déclaration et export de la classe
export default class App extends React.Component {
       
        // Attributs d'états de la classe
    state = {
        ip_robot: "...",
        port: "...",
        donneesJsonDistance: "Distance",
        donneesJsonSnirium: "Snirium",
    }

    // Méthode associée au clic du bouton "Rechercher un livre"
    _onPressAvancer = () => {
        //récupère les données du livre en fonction de l'isbn
        fetch(`http://${this.state.ip_robot}:${this.state.port}/pilotage?ordre=A`, {
            method: "GET"
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson.distance);
            this.setState({
                donneesJsonDistance: responseJson.distance
            })
            this.setState({
              donneesJsonSnirium: responseJson.snirium
            })
        })
        .catch((error) => {
        console.error(error);
        });
    }

    _onPressGauche = () => {
      //récupère les données du livre en fonction de l'isbn
      fetch(`http://${this.state.ip_robot}:${this.state.port}/pilotage?ordre=G`, {
          method: "GET"
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson.distance);
          this.setState({
              donneesJsonDistance: responseJson.distance
          })
          this.setState({
            donneesJsonSnirium: responseJson.snirium
          })
      })
      .catch((error) => {
      console.error(error);
      });
  }

    _onPressDroite = () => {
      //récupère les données du livre en fonction de l'isbn
      fetch(`http://${this.state.ip_robot}:${this.state.port}/pilotage?ordre=D`, {
          method: "GET"
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson.distance);
          this.setState({
              donneesJsonDistance: responseJson.distance
          })
          this.setState({
            donneesJsonSnirium: responseJson.snirium
          })
      })
      .catch((error) => {
      console.error(error);
      });
  }

    _onPressReculer = () => {
      //récupère les données du livre en fonction de l'isbn
      fetch(`http://${this.state.ip_robot}:${this.state.port}/pilotage?ordre=R`, {
          method: "GET"
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson.distance);
          this.setState({
              donneesJsonDistance: responseJson.distance
          })
          this.setState({
            donneesJsonSnirium: responseJson.snirium
          })
      })
      .catch((error) => {
      console.error(error);
      });
  }

    _onPressStop = () => {
      //récupère les données du livre en fonction de l'isbn
      fetch(`http://${this.state.ip_robot}:${this.state.port}/pilotage?ordre=S`, {
          method: "GET"
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson.distance);
          this.setState({
              donneesJsonDistance: responseJson.distance
          })
          this.setState({
            donneesJsonSnirium: responseJson.snirium
          })
      })
      .catch((error) => {
      console.error(error);
      });
  }

    _onPressDistance = () => {
      //récupère les données du livre en fonction de l'isbn
      fetch(`http://${this.state.ip_robot}:${this.state.port}/pilotage?ordre=L`, {
          method: "GET"
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson.distance);
          this.setState({
              donneesJsonDistance: responseJson.distance
          })
      })
      .catch((error) => {
      console.error(error);
      });
  }

    _onPressSnirium = () => {
      //récupère les données du livre en fonction de l'isbn
      fetch(`http://${this.state.ip_robot}:${this.state.port}/pilotage?ordre=C`, {
          method: "GET"
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson.snirium);
          this.setState({
              donneesJsonSnirium: responseJson.snirium
          })
      })
      .catch((error) => {
      console.error(error);
      });
  }

    // Méthode pour afficher le rendu du composant
    render() {
        return (
            <View style={styles.page}>
                <View style={styles.entete} />
                <Text style={styles.blank}>         </Text>
                <View style={styles.enligne}>
                    <View style={styles.page}>
                        <Text style={styles.infos}>IP : </Text>
                        <Text style={styles.blank}>         </Text>
                        <Text style={styles.infos}>Port :  </Text>
                        <Text style={styles.blank}>         </Text>
                        <Text style={styles.infos}>Distance :  </Text>
                        <Text style={styles.blank}>         </Text>
                        <Text style={styles.infos}>Taux snirium :  </Text>
                        <Text style={styles.blank}>         </Text>
                    </View>
                    <Text style={styles.blank}>         </Text>
                    <View style={styles.page}>
                      <TextInput
                        style={styles.zoneSaisie}
                        placeholder="Ip du robot"
                        onChangeText={(text) => this.setState({ip_robot: text})}
                      />
                      <Text style={styles.blank}>         </Text>
                      <TextInput
                        style={styles.zoneSaisie}
                        placeholder="Port"
                        onChangeText={(text) => this.setState({port: text})}
                      />
                      <Text style={styles.blank}>         </Text>
                      <Text> {this.state.donneesJsonDistance} </Text>
                      <Text style={styles.blank}>         </Text>
                      <Text> {this.state.donneesJsonSnirium} </Text>
                      <Text style={styles.blank}>         </Text>
                    </View>
                </View>
                <Text style={styles.blank}>         </Text>
                <Image
                  style={{width: 300, height: 300}}
                  source={require('./assets/carre.jpg')}
                />
                <Text style={styles.blank}>         </Text>
                <Text style={styles.blank}>         </Text>
                <View style={styles.enligne}>
                  <View style={styles.page}>
                    <Button
                      style={styles.bouton}
                      onPress={ this._onPressGauche }
                      title="GA."
                      color="#123456"
                    />
                  </View>
                  <Text style={styles.blank}>         </Text>
                  <View style={styles.page}>
                    <Button
                      style={styles.bouton}
                      onPress={ this._onPressAvancer }
                      title="AV."
                      color="#123456"
                    />
                    <Text style={styles.blank}>         </Text>
                    <Button
                      style={styles.bouton}
                      onPress={ this._onPressStop }
                      title="ST."
                      color="#123456"
                    />
                    <Text style={styles.blank}>         </Text>
                    <Button
                      style={styles.bouton}
                      onPress={ this._onPressReculer }
                      title="AR."
                      color="#123456"
                    />
                  </View>
                  <Text style={styles.blank}>         </Text>
                  <View style={styles.page}>
                    <Button
                      style={styles.bouton}
                      onPress={ this._onPressDroite }
                      title="DR."
                      color="#123456"
                    />
                  </View>
                  <Text style={styles.blank}>         </Text>
                  <View style={styles.page}>
                    <Button
                      style={styles.bouton}
                      onPress={ this._onPressAfficher }
                      title="get snirium"
                      color="#123456"
                    />
                    <Text style={styles.blank}>         </Text>
                    <Text style={styles.blank}>         </Text>
                    <Button
                      style={styles.bouton}
                      onPress={ this._onPressDistance }
                      title="get dist."
                      color="#123456"
                    />
                  </View>
                </View>
                <View style={styles.piedPage} />   
            </View>
        );
    }
}// Fin de la vue utilisateur
// Styles pour les composants
const styles = StyleSheet.create({
// Styles view de l'app mobile-----------------------------------------------------
 page: {
    flexDirection: "column",
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
 },
 enligne: {
    flexDirection: "row",
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
 },
 entete: {
    width: 60,
    height: 40,
 },
 piedPage: {
    width: 500,
    height: 30,
    backgroundColor: 'blue',
 },
// Fin des styles view----------------------------------------------------------------
// Styles des composants
 //labels vides
 blank: {
    width: 20,
    height: 20,
 },
 //style du titre
 infos: {
    height: 25,
    width: 90,
    fontSize: 16,
    fontStyle: 'italic',
 },
 // Styles des composants interactifs---------------------------------
 zoneSaisie: {
    height: 20,
    width: 215,
    fontSize: 18,
    borderWidth: 1,
 },
 bouton: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'blue',
    marginBottom: -1,
 },
 // Fin des styles des composants interactifs---------------------------
// Styles des informations de la base de données
 infos: {
    fontSize: 18,
    fontStyle: "italic",
    color: 'red',
    alignItems: 'flex-start',
 },
// Fin des styles informatifs
});
// FIN DU PROGRAMME