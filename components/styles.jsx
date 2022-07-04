const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#dacbc7",
      resizeMode:"cover",
      flexDirection: "row"
        },
    signInImage: {
      resizeMode: "contain",
      borderColor: "#423034",
      justifyContent: 'space-between'
    },
    imageFp: {
      marginBottom: 100,
      height: 280,
      width: 280,
      borderRadius: 1800
    },
    title:{
      fontFamily:"Avenir",
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 24,
      textAlign: "center",
      color: "#423034"
        },
    body:{
      fontFamily:"Avenir",
      fontSize: 15,
      textAlign: "center",
      color: "#423034"
        }
  });

  export default styles