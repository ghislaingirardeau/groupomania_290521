<template> <!-- creation d'une VIEW 'account' pour anticiper l'ajout futur de nouveau 
            composant lié a la gestion du compte personnel -->
    
    <aside>
      <Deleteaccount/> <!-- composant pour l'ajout de sujet -->
    
    </aside>
</template>

<script>
import Deleteaccount from '../components/Delete_account.vue'

export default ({
    components: {
    Deleteaccount
  },
})
</script>
