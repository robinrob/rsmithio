#!/usr/bin/env zsh

[[ $fpath = *dotfiles-base* ]] || fpath=($FUNCS_HOME $fpath)
autoload -U +X $fpath[1]/*(:t) 2> /dev/null
source $ZSHCOLORS_PATH

sed_all 's/\$theme-one/\$theme-1/g' '*'
sed_all 's/\$theme-two/\$theme-2/g' '*'
sed_all 's/\$theme-three/\$theme-3/g' '*'
sed_all 's/\$theme-four/\$theme-4/g' '*'
sed_all 's/\$theme-five/\$theme-5/g' '*'
