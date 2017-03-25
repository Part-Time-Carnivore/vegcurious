Vue.component('tracker-day', {
    props: ['id','selected'],
    data: function () {
        return {
            options: veg
        };
    },
    template: `
        <label :for="id">
            <time>{{id}}</time>
            <select :id="id" multiple="multiple" v-model="selected">
                <option v-for="option in options" :value="option.id">{{option.name}}</option>
            </select>
            <i>{{selected.length}}</i>
        </label>
    `
});